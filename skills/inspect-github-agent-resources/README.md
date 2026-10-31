# GitHub Agent Resource Review

Author: Ansel.

Inspect GitHub agent resources for task fit, security risks, and version acceptance. The skill combines a bounded, source-based security review with practical guidance on usefulness, tradeoffs, and the next verification. It retains traceable versions, inspected surfaces, findings, and gaps. A dependency-free Node.js helper inventories an authorized local snapshot without running its code.

**v0.1.0 trial release (prerelease).** Maintained by Ansel under [MIT](LICENSE). The [repository README](https://github.com/anselbuilds/inspect-github-agent-resources/tree/v0.1.0#readme) supplies installation and first-use instructions.

## What to decide with it

Use it before trying an unfamiliar agent resource, comparing candidates for a specific task, or reviewing a changed version. The output should tell you what the resource helps complete, which security concerns affect the proposed use, which tradeoffs matter, what the evidence cannot establish, and the smallest useful acceptance check. Human interpretation and any authorized runtime testing remain separate.

## Security review scope

Security inspection is a core capability, alongside task fit and version acceptance. Within the declared source scope, review:

- Instructions and hidden content: prompt-injection attempts, boundary overrides, concealed comments and Unicode indicators. Indicators need interpretation; an unusual character alone does not establish an attack.
- Permissions and data handling: credential requests, sensitive reads, writes, network destinations, telemetry, and possible disclosure paths.
- Execution and persistence: install hooks, commands, executable or binary entry points, background behavior and updates.
- Provenance and supply chain: exact versions, dependencies, publisher evidence, relevant official advisories and unreviewed surfaces.

For each material finding, identify the source evidence, affected action, likely consequence, uncertainty, and next verification. Keep usefulness separate from security disposition: a useful resource may still have an unresolved security concern.

The agent reviews meaning and data flow from inspected sources; the helper supplies mechanical indicators and inventory. This is bounded static review, not execution in a sandbox, penetration testing, comprehensive malware detection, or a security certification. Runtime effects and omitted surfaces remain unverified unless separately tested within an authorized workflow.

## What runs today

- [SKILL.md](SKILL.md): a portable inspection workflow for skills, plugins, MCP servers, and agent templates.
- [Audit contract](references/audit-contract.md): task fit, security findings and dispositions, conditional recommendations, acceptance checks, evidence labels, and coverage.
- [Static inventory](references/scanner.md): hashes, hidden Unicode, comments, selected hooks, and execution surfaces.
- [Acceptance and maintenance](references/maintenance.md): define an accepted delivery, preserve reviewer decisions, and revalidate evidence affected by version changes; includes a local snapshot comparison helper.

The helper is not a semantic malware detector, vulnerability database, sandbox, or security certification service. Model-assisted inspection quality has not been benchmarked here. `complete` means the helper completed its declared included scope; exit code 0 does not mean a resource is acceptable to install.

## Local use

Compatibility floor: Node.js 20.0.0. Use a maintained Node.js LTS line such as the tested Node 24; Node 20 is end-of-life. No package installation, API key, or third-party Node dependency is needed for the helpers. Public review needs an agent with anonymous public web access; a local-only review can use supplied files and explicitly retain missing provenance/advisory evidence. Agent file reads may be sent to its model provider; the helper's local execution is not an offline guarantee for the agent.

From this repository:

```sh
node --test scripts/tests/static-agent-resource-scan.test.mjs scripts/tests/compare-snapshots.test.mjs
node scripts/static-agent-resource-scan.mjs --root /path/to/authorized-snapshot --pretty
node scripts/compare-snapshots.mjs --before /path/to/old-snapshot --after /path/to/new-snapshot
```

The helpers print to stdout. To save a report, redirect outside the scanned directories; writing into an input would change the evidence being measured. Run only against stable snapshots that you are authorized to read. Do not invoke candidate scripts.

To try the skill without installing it, give a supporting agent this repository's `SKILL.md` and a public repository URL. Persistent skill installation is a separate user action. Do not copy a preparation package's sibling private files into a skill directory or public repository.

## Deliverable and maintenance

An inspection first answers the user's task-fit and next-step questions, supported by a versioned target, evidence log, coverage record, findings, and unresolved verification. Updating a target creates a new inspection revision. A [synthetic example](examples/review-example.md) shows how to turn a technical indicator into a practical decision and an acceptance check.

The compare helper supports a manual maintenance workflow. It does not schedule checks, fetch new versions, preserve Git history, or approve an update. Runtime validation and expert judgment remain separate activities.

## Sources and attribution

The optional differential-review comparison used [Trail of Bits differential-review](https://github.com/trailofbits/skills/tree/442fc9d6c89b1e937e6f7a477e7071ea75fcbea4/plugins/differential-review/skills/differential-review) at that fixed revision. Its [repository license](https://github.com/trailofbits/skills/blob/442fc9d6c89b1e937e6f7a477e7071ea75fcbea4/LICENSE) is CC BY-SA 4.0. Those upstream guides are not bundled here, and the reference does not imply endorsement. This package makes no comparative accuracy or human-time-saving claim.

## Contributing and reporting problems

Use synthetic fixtures to demonstrate a reproducible failure. Include runtime version, invocation, expected result, and observed result. Do not submit credentials, customer content, or exploitable private configuration. See [SECURITY.md](SECURITY.md) for the current reporting limitations.
