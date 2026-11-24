function createEngine(){
  const result=(status,reason,extra={})=>({status,reason,...extra});
  const truth=v=>v===true;
  function intake(event,seen){
    if(!event?.id||!event?.fingerprint)return result("INVALID","Missing event identity");
    if(Object.prototype.hasOwnProperty.call(seen,event.id))
      return result(seen[event.id]===event.fingerprint?"NOOP":"CONFLICT","Existing event; reconcile before action");
    if(!event.work_id)return result("RESOLVE","AI resolves existing business meaning or forms genuinely new scope");
    return result("INTAKE_READY","Known work identity",{work_id:event.work_id});
  }
  function validate(steps){
    if(!Array.isArray(steps)||!steps.length)return false;
    const ids=steps.map(s=>s.id),map=new Map(steps.map(s=>[s.id,s]));
    if(ids.some(x=>!x)||map.size!==steps.length)return false;
    const visited=new Set(),active=new Set();
    function visit(id){if(!map.has(id)||active.has(id))return false;if(visited.has(id))return true;
      active.add(id);if(!(map.get(id).depends_on||[]).every(visit))return false;active.delete(id);visited.add(id);return true;}
    return ids.every(visit);
  }
  function frontier(steps,caps){
    if(!validate(steps))return result("INVALID","Invalid or cyclic dependency graph");
    const done=new Set(steps.filter(s=>s.state==="DONE").map(s=>s.id));
    const ready=[],waiting=[],reconcile=[];
    for(const s of steps){if(done.has(s.id))continue;
      if(["RUNNING","EFFECT_UNKNOWN","COMMIT_PENDING"].includes(s.state)){reconcile.push(s.id);continue;}
      const missing=(s.depends_on||[]).filter(id=>!done.has(id));
      if(s.state==="WAITING"||missing.length||(s.capability&&!caps.includes(s.capability))){
        waiting.push({id:s.id,reason:s.wait_reason||(missing.length?"dependency":"capability/input"),missing});continue;}
      ready.push(s.id);
    }
    return result("FRONTIER","Keep unrelated actions runnable",{ready,waiting,reconcile,done:[...done]});
  }
  function planDay(day,work){
    if(day.off)return result("DAY_OFF","No business task scheduled for the user's holiday",{date:day.date,selected:[],backlog:work.length});
    // Scope and readiness are different from strategic priority. Host determines evidence-based
    // next actions, actual business urgency, dependencies and user overrides; no invented dates/score.
    const order={P0:0,P1:1,UNKNOWN:2},human={"Khẩn cấp":0,"Cao":1,"Bình thường":2,"Thấp":3};
    const eligible=work.filter(w=>!w.is_test&&w.admitted===true&&["READY","CHECK"].includes(w.readiness)&&w.action);
    function cmp(a,b){
      // Explicit owner priority governs when provided. Otherwise use urgent actual signal,
      // source priority, unblock/impact (ordinal from source-grounded AI reasoning), then stable ID.
      const ah=human[a.user_priority],bh=human[b.user_priority];
      if(ah!==undefined||bh!==undefined){let d=(ah??2)-(bh??2);if(d)return d;}
      let d=Number(b.verified_urgent===true)-Number(a.verified_urgent===true);if(d)return d;
      d=(order[a.source_priority]??2)-(order[b.source_priority]??2);if(d)return d;
      d=(a.dependency_rank??9)-(b.dependency_rank??9);if(d)return d;
      d=(a.action_rank??9)-(b.action_rank??9);if(d)return d;
      return String(a.work_id).localeCompare(String(b.work_id));
    }
    const sorted=eligible.slice().sort(cmp);
    // Candidate order, not a promised daily volume or clock schedule.
    return result("PLAN_READY","Ordered candidates, capacity/dates only if known",{date:day.date,selected:sorted,not_admitted:work.filter(w=>!w.is_test&&!eligible.includes(w)).map(w=>({work_id:w.work_id,reason:w.wait_reason||"Not selected / no available action"}))});
  }
  function admit(p,o){
    if(!p?.run_id||!p.work_id||!p.action_id||!Number.isInteger(p.expected_revision)||!p.input_refs?.length||!p.output||!p.criteria?.length||!p.write_scope)
      return result("INVALID","Incomplete work package");
    if(o.event_seen===true)return result("NOOP","Already recorded; inspect receipt");
    if(o.effect_unknown===true)return result("RECONCILE","Uncertain effect; do not retry");
    if(o.current_revision!==p.expected_revision)return result("STALE","Refresh affected record and plan");
    if(!truth(o.authority_ok)||!truth(o.scope_ok))return result("WAITING","Action authority / write scope");
    if(!truth(o.capability_ok))return result("WAITING","Actual tool capability");
    if(!truth(o.dependencies_met))return result("WAITING","Required input/dependency");
    return result("ADMITTED","Allowed scoped action, not proof of execution");
  }
  function evaluate(p,r){
    if(r?.run_id!==p.run_id||r?.action_id!==p.action_id)return result("CONFLICT","Receipt mismatch");
    if(r.effect_unknown)return result("RECONCILE","Uncertain action effect");
    if(r.status!=="COMPLETED"||!r.artifact_refs?.length)return result("REWORK_OR_WAIT","Missing completed output");
    const unmet=p.criteria.filter(c=>r.checks?.[c]!==true);
    if(unmet.length)return result("REWORK_OR_WAIT","Specific criteria unmet",{unmet});
    const parentChecks=p.parent_criteria||[];
    const parentDone=parentChecks.length>0&&parentChecks.every(c=>r.parent_checks?.[c]===true);
    return result("COMMIT_ELIGIBLE","Scoped action may close; parent needs its own criteria",{action_done:true,parent_done:parentDone});
  }
  async function runOne(adapter,packet){
    // Native adapter must use authorized tools; check methods verify actual output, not LLM self-assertion alone.
    let observed=await adapter.observe(packet);
    let gate=admit(packet,observed);if(gate.status!=="ADMITTED"){await adapter.checkpoint(packet,gate);return gate;}
    await adapter.checkpoint(packet,result("RUNNING","Action intent recorded before tool effect"));
    let receipt;
    try{receipt=await adapter.execute(packet);}catch(e){
      const out=result("RECONCILE","Execution outcome uncertain; inspect before any retry");
      await adapter.checkpoint(packet,out);return out;
    }
    let verification=await adapter.verify(packet,receipt);
    let evaluated=evaluate(packet,verification);
    if(evaluated.status!=="COMMIT_ELIGIBLE"){await adapter.checkpoint(packet,evaluated);return evaluated;}
    observed=await adapter.observe(packet);gate=admit(packet,observed);
    if(gate.status!=="ADMITTED"){await adapter.checkpoint(packet,gate);return gate;}
    await adapter.checkpoint(packet,result("COMMIT_PENDING","Persist scoped intent; host serializes writes"));
    let readback;
    try{await adapter.commit(packet,verification,evaluated);readback=await adapter.readback(packet);}
    catch(e){const out=result("RECONCILE","Commit outcome unknown");await adapter.checkpoint(packet,out);return out;}
    const required=["same_identity","event_once","expected_delta","protected_fields_preserved","readback_ok"];
    const verified=required.every(k=>readback?.[k]===true)&&readback.revision===packet.expected_revision+1;
    const out=verified?result("COMMITTED","Actual scoped delta observed",{action_done:true,parent_done:evaluated.parent_done,revision:readback.revision}):result("RECONCILE","Readback not fully verified");
    await adapter.checkpoint(packet,out);return out;
  }
  async function runLoop(adapter,initial,limit){
    // Finite host invocation, not daemon. Adapter nextPacket consults current state and replan.
    const results=[];let packet=initial;
    for(let i=0;i<limit&&packet;i++){
      let outcome=await runOne(adapter,packet);results.push(outcome);
      if(["RECONCILE","CONFLICT","STALE","INVALID"].includes(outcome.status))break;
      // Adapter cannot repeat unchanged failed action or create a new ID to bypass a blocker.
      let next=await adapter.nextPacket(packet,outcome);
      if(next&&next.action_id===packet.action_id&&next.expected_revision===packet.expected_revision)break;
      packet=next;
    }
    return result("YIELD","Save actual frontier; continue on authorized invocation",{results,next:packet?.action_id||null});
  }
  return {intake,validate,frontier,planDay,admit,evaluate,runOne,runLoop};
}

module.exports = { createEngine };
