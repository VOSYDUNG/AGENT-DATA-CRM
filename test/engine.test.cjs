const assert = require('node:assert/strict');
const { createEngine } = require('../src/engine.cjs');
async function runFixtures(createEngine, assert){
 const e=createEngine(),p={run_id:"r",work_id:"w",action_id:"a",expected_revision:1,input_refs:["source"],output:"artifact",criteria:["correct"],parent_criteria:["approved"],write_scope:"one row"};
 const o={current_revision:1,authority_ok:true,scope_ok:true,capability_ok:true,dependencies_met:true};
 const receipt={run_id:"r",action_id:"a",status:"COMPLETED",artifact_refs:["artifact"],checks:{correct:true},parent_checks:{approved:false}};
 const results=[];
 const test=async(name,fn)=>{await fn();results.push(name)};
 await test("intake new meaning",()=>assert(e.intake({id:"e",fingerprint:"1"},{}).status==="RESOLVE"));
 await test("duplicate event",()=>assert(e.intake({id:"e",fingerprint:"1"},{e:"1"}).status==="NOOP"));
 await test("conflicting event",()=>assert(e.intake({id:"e",fingerprint:"2"},{e:"1"}).status==="CONFLICT"));
 await test("cycle rejection",()=>assert(!e.validate([{id:"a",depends_on:["b"]},{id:"b",depends_on:["a"]}])));
 await test("independent work",()=>assert(e.frontier([{id:"a",state:"WAITING"},{id:"b",depends_on:["a"]},{id:"c"}],[]).ready.join()==="c"));
 await test("holiday",()=>assert(e.planDay({off:true},[{work_id:"w"}]).selected.length===0));
 await test("business source priority",()=>assert(e.planDay({off:false},[{work_id:"a",admitted:true,readiness:"READY",action:"x",source_priority:"P1"},{work_id:"b",admitted:true,readiness:"READY",action:"y",source_priority:"P0"}]).selected[0].work_id==="b"));
 await test("stale revision",()=>assert(e.admit(p,{...o,current_revision:2}).status==="STALE"));
 await test("authority",()=>assert(e.admit(p,{...o,authority_ok:false}).status==="WAITING"));
 await test("capability",()=>assert(e.admit(p,{...o,capability_ok:false}).status==="WAITING"));
 await test("unknown effect",()=>assert(e.admit(p,{...o,effect_unknown:true}).status==="RECONCILE"));
 await test("unmet checks",()=>assert(e.evaluate(p,{...receipt,checks:{}}).status==="REWORK_OR_WAIT"));
 await test("parent separate",()=>assert(e.evaluate(p,receipt).parent_done===false));
 let events=[];
 const adapter={observe:async()=>o,checkpoint:async(p,x)=>events.push(x.status),execute:async()=>receipt,verify:async(p,r)=>r,commit:async()=>events.push("commit"),readback:async()=>({same_identity:true,event_once:true,expected_delta:true,protected_fields_preserved:true,readback_ok:true,revision:2}),nextPacket:async p=>p};
 await test("execute commit readback",async()=>{events=[];assert((await e.runOne(adapter,p)).status==="COMMITTED");assert(events.join()==="RUNNING,COMMIT_PENDING,commit,COMMITTED")});
 await test("no repeat unchanged action",async()=>{events=[];const r=await e.runLoop(adapter,p,5);assert(r.results.length===1)});
 return results;
}
runFixtures(createEngine, value => assert.ok(value)).then(names => { for (const name of names) console.log('PASS', name); console.log(names.length + ' fixture checks passed'); }).catch(error => { console.error(error); process.exitCode = 1; });
