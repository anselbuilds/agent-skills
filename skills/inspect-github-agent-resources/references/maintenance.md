# Acceptance delivery and maintained assets

Use when the user asks about recurring delivery, productization, or version maintenance. Do not force an ordinary tool question into a commercial proposal.

## Define one accepted unit of work

Start from the user's actual job. Describe the concrete input, output, consumer, and observable acceptance conditions. A report is useful only if its recipient can perform the intended next step with it.

For an agent-resource acceptance packet, the workflow might be:

`named resource + exact version + deployment constraints → scoped evidence collection → findings with testable claims → designated reviewer assessment → accepted packet or precise unresolved work`

Identify which stages exist, which are only proposed, and what code or human review implements each. Do not describe a written plan as an operating pipeline.

An acceptance packet can contain a source/ref manifest, evidence-linked findings, applicable criteria, cases with expected results, observed results when available, unresolved conditions, and reviewer decisions. Reuse the audit evidence log and existing scanner output; do not create a parallel truth record or mandatory extra schema.

The inspection can propose acceptance criteria, but calling them expert criteria requires a named expert source or reviewer and a record of what they validated. Synthetic cases test behavior in those cases; they are not professional sign-off or proof of general effectiveness.

## Describe the maintained asset set

Specify exactly which resources, refs and environments are in scope. Link each material claim to its source and any acceptance case or reviewer decision that depends on it. Preserve manual annotations and distinguish them from generated evidence.

On a version change, produce a new revision:

1. Compare the previous and current scoped evidence.
2. Name claims, findings and cases affected by changed inputs. Bytes alone cannot determine semantic impact.
3. Retain unaffected evidence with its original version; mark changed-dependent conclusions for reinspection. Do not silently renew an old decision.
4. Record the new checks and the reviewer decision or unresolved work. Preserve the prior revision and human corrections.

Reinspection may be triggered by a changed entry point, dependency, permission, network destination, relevant advisory or deployment environment, even if some included file hashes match. State a cadence only if the user has asked for one; do not create monitoring or notifications from this document.

For business requests, distinguish a delivery-pipeline unit (one repeatable class of intake-to-accepted-output work) from an asset-maintenance unit (a named set of resources and associated evidence over time). Describe who incurs the current cost and what repeatable outcome they may pay for. Treat pricing and willingness to pay as hypotheses until actual evidence supports them.

## Optional local comparison helper

`node <this-skill>/scripts/compare-snapshots.mjs --before <old> --after <new>`

Both paths must be already-local stable snapshots within the user's authorized reads. The helper reuses the inventory scanner and prints Markdown to stdout; it makes no network call, durable write, scheduler or candidate-code execution.

It compares included file hashes and reports fingerprint differences that may include link metadata. Partial coverage cannot prove absence or equality. Excluded directories and linked target contents remain outside coverage. It does not decide whether a vulnerability was fixed, an API remains compatible, or an update should be installed.

The maintained asset is the versioned evidence and its acceptance history. A matching fingerprint does not renew a security decision or service promise.
