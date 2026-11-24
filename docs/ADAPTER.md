# Native-host adapter contract

Engine is a deterministic guard around a semantic AI host. The host selects the method, reads actual input and invokes real authorized tools. For tool-only ChatGPT, apply this contract directly; do not pretend the JS has a wired adapter. No standalone production service is included.

## Package
`run_id, work_id, action_id, expected_revision, input_refs, output, criteria, parent_criteria, write_scope`. Stable identities; input references and actual owner authority. Choose meaningful criteria by the type of work.

## Adapter methods

| Method | Contract |
|---|---|
| observe(packet) | Actual revision, event_seen, effect_unknown, authority_ok, scope_ok, capability_ok, dependencies_met |
| checkpoint(packet,state) | Durable record of intent, known output, uncertain effects and safe frontier |
| execute(packet) | Perform scoped work through authorized tools; return actual receipt |
| verify(packet,receipt) | Check actual output and criteria, not self-report; run_id/action_id, status, artifact_refs, checks, parent_checks, effect_unknown |
| commit(packet,verification,evaluated) | Reconcile current version, serialize overlapping writes, scoped state delta + linked event |
| readback(packet) | Actual same_identity, event_once, expected_delta, protected_fields_preserved, readback_ok and revision |
| nextPacket(packet,outcome) | Replan affected frontier and return next legitimate action, or null |

Read-before-write on Sheets is not atomic multiwriter CAS; host must serialize overlapping writes. Unknown effects require reconciliation, never blind retry. Do not store tokens. Only the actual host can establish permission.

## Adaptive work
Resolve existing work identity before creating new work. If a novel class arises, form a suitable method and bounded output, not a fixed enum. On new evidence or changed priorities, replan affected actions. After real friction or material outcome, capture source, method version, observed problem/result, proposed scoped delta, evidence/checks and rollback reference. Promote only supported improvements and reuse in matching contexts.

## Current boundary
Core and fixture suite are portable. Live tool integration is by authorized native AI host. CRM navigation, upload, test, error repair and release require verified correct tenant/environment and permission. A mock adapter test is not live E2E. Source-of-truth links and current checkpoint are on Drive. No AIOS, scheduler, or automatic publication.
