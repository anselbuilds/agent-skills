# Agent Resource Review by Ansel

Review a skill, plugin, MCP server, or agent template before adopting it or accepting an update. Connect task fit, static security findings, and version evidence to a concrete next verification.

**v0.1.0 trial release (prerelease).** Created and maintained by Ansel, under the [MIT license](../../LICENSE).

[Download v0.1.0](https://github.com/anselbuilds/inspect-github-agent-resources/archive/refs/tags/v0.1.0.zip) · [Release notes](https://github.com/anselbuilds/inspect-github-agent-resources/releases/tag/v0.1.0) · [Installation](#install-the-skill)

## What you get

- A reusable [agent skill](../../skills/inspect-github-agent-resources/SKILL.md) for task fit, source-based security review, and version acceptance.
- A dependency-free Node.js helper for local inventory, hashes, hidden Unicode and comments, selected hooks, and execution surfaces.
- A local snapshot comparison helper, regression tests, and a [synthetic review example](../../skills/inspect-github-agent-resources/examples/review-example.md).

The agent interprets source meaning and data flow. The helpers provide mechanical observations. Neither produces a security certification or permission to install the reviewed resource. Dynamic sandbox testing, complete malware detection, and measured review accuracy are outside this release's demonstrated scope.

## Requirements

Use a maintained Node.js LTS version for the optional helpers; Node 24 is the recommended tested line. The declared compatibility floor is Node 20.0.0, tested separately as a legacy compatibility case. Node 20 is [end-of-life](https://nodejs.org/en/about/eol), so compatibility is not a recommendation to install it. No npm install, API key, or third-party Node package is needed.

The workflow needs an agent that can read the skill folder and source files. Public repository review also needs anonymous public web access. Local-only review needs no web access; unavailable publisher or advisory evidence must remain explicit gaps.

## Try it without installation

1. Download and extract the [v0.1.0 repository ZIP](https://github.com/anselbuilds/inspect-github-agent-resources/archive/refs/tags/v0.1.0.zip) into a working directory. Keep `skills/inspect-github-agent-resources/` intact, including its references and scripts.
2. Open that directory in an agent with file-reading capability.
3. Give it this prompt, replacing `<repo>` with the extracted directory:

> Read `<repo>/skills/inspect-github-agent-resources/SKILL.md` and use that skill to inspect `<repo>/skills/inspect-github-agent-resources/examples/demo-snapshot`. I want to summarize my own local notes. Explain task fit, source-based security concerns, evidence gaps, and the smallest useful acceptance check. Do not install or execute the reviewed resource. You may run this review skill's inventory helper.

The demo is fictional and contains no real personal data. A successful answer explains its narrow note-summary purpose, cites the supplied files, distinguishes declared behavior from runtime evidence, and proposes a small verification. It must not claim security certification or invent a publisher/release history. For this demo, a useful answer is: "It can outline one explicitly supplied note, but source instructions alone do not prove summary quality or offline model processing. Try a synthetic note with uncertain claims and check that uncertainty is retained." This is an illustration, not a measured review result. The [longer report example](../../skills/inspect-github-agent-resources/examples/review-example.md) uses a different scenario to demonstrate the same evidence structure.

## Install the skill

Copy only `skills/inspect-github-agent-resources/`, including its LICENSE, to the skill location supported by your agent. Do not copy the release preparation workspace or private evaluation material.

| Agent | Project-local destination | Personal destination |
| --- | --- | --- |
| Codex | `.agents/skills/inspect-github-agent-resources/` | `~/.agents/skills/inspect-github-agent-resources/` |
| GitHub Copilot | `.github/skills/inspect-github-agent-resources/` | `~/.copilot/skills/inspect-github-agent-resources/` |

These are the current documented defaults, not a command to override local organization policy or an existing skill directory. If a destination exists, preserve it and compare versions before replacement. Other hosts may use different paths. Local installation does not create a plugin-store listing.

For example, from an extracted repo, this POSIX shell snippet copies into a new Copilot project directory and refuses an existing destination:

```sh
target=".github/skills/inspect-github-agent-resources"
if [ -e "$target" ] || [ -L "$target" ]; then
  echo "Destination exists; compare versions before replacing it." >&2
else
  mkdir -p .github/skills
  cp -R skills/inspect-github-agent-resources "$target"
fi
```

On Windows, copy the same complete folder using the file manager. The resulting path must end in `inspect-github-agent-resources/SKILL.md`, not a double-nested duplicate folder. Reopen the agent's skill selector; if it does not appear, follow that host's refresh/restart guidance.

Sources: [OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills), [GitHub skill installation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills). Installation discovery in each host has not been end-to-end tested by this release.

## First real use

In Codex, select the installed skill or start with `$inspect-github-agent-resources`. In another host, invoke it through that host's skill picker or name it explicitly.

**Review a resource:**

> Use inspect-github-agent-resources to review `<public-repository-URL>` at `<tag-or-commit>` for `<my-task>`. My constraints are `<data, environment, and execution limits>`. Explain fit, source-based security findings, what remains unverified, and an acceptance check. Do not install or run the target.

**Review an update:**

> Use inspect-github-agent-resources to compare these authorized local snapshots: `<before-directory>` and `<after-directory>`. Identify changed behavior, affected prior conclusions, and checks needed before accepting the update. Do not run either snapshot's code.

**Ask only about capability:**

> What could this skill help me do when choosing an MCP server? Explain with two examples; do not start an audit.

Expect a decision brief with version/hash evidence, inspected scope, material findings and gaps, and the next useful check. A partial inventory must not become an assurance that omitted files are absent or unchanged. The skill does not automatically download or install targets; provide an authorized local snapshot separately if you want exact-byte inventory.

## Run helpers directly

From the repository root:

```sh
node --version
node --test skills/inspect-github-agent-resources/scripts/tests/static-agent-resource-scan.test.mjs skills/inspect-github-agent-resources/scripts/tests/compare-snapshots.test.mjs
node skills/inspect-github-agent-resources/scripts/static-agent-resource-scan.mjs --root skills/inspect-github-agent-resources/examples/demo-snapshot --pretty
node skills/inspect-github-agent-resources/scripts/compare-snapshots.mjs --before /path/to/old-snapshot --after /path/to/new-snapshot
```

The scanner emits JSON to stdout: exit 0 means its included inventory completed, 1 means incomplete/error, and 2 means invalid input. It does not mean the target is safe. Save reports outside the scanned inputs so you do not alter the evidence. The compare helper emits Markdown; it does not fetch, schedule, or approve updates.

If `node` is not found, install a maintained Node release through your normal trusted process. If a read is partial, inspect the reported gap before changing scope or limits. For a capability question alone, the helper is unnecessary.

## Privacy and limits

The helpers stay local, but agent reading may send content to its model provider. Relative filenames, hashes, findings, and reports can reveal private information. Use only material authorized for the selected agent environment, and review reports before sharing. The scanner is not a secret scrubber or filesystem sandbox.

See [scanner coverage](../../skills/inspect-github-agent-resources/references/scanner.md), [SECURITY.md](SECURITY.md), and [acceptance evidence](VALIDATION.md). Public sources, local observations, inferences, and runtime measurements must remain distinct.

## License, attribution, and feedback

This release uses [MIT](../../LICENSE), with a copy inside the installable skill folder. Author and maintainer: Ansel. Upstream references are documented in the [skill README](../../skills/inspect-github-agent-resources/README.md); external material is not relicensed by this package.

Use [Issues](https://github.com/anselbuilds/agent-skills/issues) with synthetic reproductions for ordinary bugs. Sensitive reports follow [SECURITY.md](SECURITY.md) through GitHub private vulnerability reporting. No response time is promised. See [release notes](CHANGELOG.md).
