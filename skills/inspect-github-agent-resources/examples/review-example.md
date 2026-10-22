# Synthetic example: answer the decision

This is a fictional demonstration, not a real audit, measured result, or expert approval.

**User:** I manually inspect third-party skills each week. Can a local inventory helper improve that process? Files must remain on-device and I am not ready to execute candidate code.

**Synthetic source:** The helper reads an explicitly named directory and emits file hashes and hook indicators to stdout. It excludes dependency directories and does not perform semantic code analysis. No comparative performance results or complete provenance packet were provided.

**Example answer:** It could help with repeatable file inventory and version-change detection, while you still review the meaning of scripts and omitted dependencies. I would first evaluate it on synthetic snapshots for that narrow role. There is no evidence here that it detects more vulnerabilities or saves a measured amount of time.

| Task | Input and output | Proposed acceptance |
| --- | --- | --- |
| Inventory before manual review | Authorized snapshot → hashes, hooks and skipped-file record | A known synthetic hook is surfaced; skipped directories remain visible; no candidate hook is executed |
| Revisit a changed version | Two scoped snapshots → changed-file observations | A modified hook changes the observation; incomplete coverage never becomes a confirmed removal or equality claim |

Have the source reviewer verify the complete read/write and network boundary before using sensitive snapshots. A declared local mode alone does not prove every runtime effect. The current installation disposition is `insufficient-evidence` because important provenance and behavior evidence is missing; that does not prevent identifying the useful inventory role.

For a maintained packet, preserve each version's evidence and reviewer notes. A changed hook identifies a claim to revisit, not a demonstrated vulnerability or fix. An unchanged included fingerprint does not establish that external advisories or the deployment environment are unchanged.

In an actual audit, cite the inspected files, hashes/ref and observation time. Synthetic source observations must remain labeled as synthetic; do not turn this example into public-source evidence.
