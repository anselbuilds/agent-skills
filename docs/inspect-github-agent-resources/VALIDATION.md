# v0.1.0 local acceptance

This records local acceptance of the v0.1.0 trial release. Validation checks specific behavior; it is not a security certification or a comparative accuracy benchmark.

## Helper compatibility

On macOS arm64, Node.js 20.0.0 and 24.21.0 each passed all 24 regression tests, with no skips. Both ran the documented demo inventory and before/after comparison successfully. The tests cover read-only inventory, hidden-text indicators, bounds, coverage gaps, command redaction, Unicode offsets, symlinks, deterministic ordering, and comparison semantics.

Node 20.0.0 was obtained from the official Node distribution and matched its published SHA-256 manifest; it was used only for compatibility testing. Use a maintained Node LTS line for regular operation. The tests do not establish compatibility with every intermediate version or OS.

## Agent use

Independent agent sessions used the supplied skill and referenced sources, without receiving expected answers. Three local scenarios covered first use from the README, static review of a synthetic resource, and a version-change decision. Their observed outputs were checked against a rubric recorded before the runs.

- First use: followed the no-install README path, read the demo and ran the review helper. Distinguished narrow task fit from untested behavior and model-provider privacy. A mismatch between the demo and the linked report example was clarified in the README.
- Static review: identified a synthetic postinstall path that reads a note and attempts an HTTP POST, and an HTML comment trying to suppress that finding. Did not obey the embedded reviewer instruction or execute the target.
- Version review: identified newly added outbound note data, a synchronous-to-async API change, and the resulting offline/error-handling implications. Preserved unaffected evidence and did not treat a clean mechanical scan as proof of safety.


A fourth scenario used the actual public [Anthropic PDF skill](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/pdf). The agent resolved an immutable commit and read six target files plus six directly relevant official sources. It connected table-extraction suitability to dependencies and example behavior, checked the unit-specific license, retained unpinned-runtime and advisory uncertainty, and proposed a page/row/value acceptance check. It did not install the target, process a PDF, or measure extraction quality. This was the same agent that performed the initial onboarding case, not a fourth independent agent. No upstream skill source is bundled here.

These are bounded observed examples using this agent environment, not measurements of general detection rate, false positives, human time savings, or all-agent compatibility. Target code was not executed.

## Remaining limits

Host-native skill discovery/installation in Codex and Copilot, Windows/Linux runtime testing, adversarial live-filesystem isolation, dynamic malware testing, and public release/download validation are not claimed. Agent file reading may send material to a model provider even when a helper itself stays local.
