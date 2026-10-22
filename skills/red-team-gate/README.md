# Red-Team Gate

An agent skill that puts one claim through an independent attempt to refute it before you rely on it.

It builds the strongest version of the claim, hands that version to a fresh reviewer whose only job is to break it, and makes the reviewer use a method suited to the kind of claim. You get a verdict (survives, weakened, or refuted), the strongest attack, and the reasoning trail. The decision stays with you.

> Version 0.1.0, experimental prerelease · Maintainer: Ansel · License: MIT
> Method article: [Red-team a claim before you build on it](https://trigpoint.pub/methods/red-team-a-claim) (a full-text snapshot is in [`docs/red-team-gate/method.md`](../../docs/red-team-gate/method.md), licensed CC BY 4.0)

## What you get

- A [skill](SKILL.md) with a five-step workflow: classify the claim, steelman it, hand it to an independent reviewer, attack it with a method for its type, report the verdict.
- [Method cards](references/methods.md) for empirical, definitional, conceptual, normative, and framework claims, plus cross-cutting cards. Each card states its source.
- [Practice claims](examples/practice-claims.md), some deliberately wrong, with the answer key in [VALIDATION.md](../../docs/red-team-gate/VALIDATION.md).
- An [example report](examples/example-report.md).

## What it does not do

- It does not verify every sentence of a document. Pick the one to three claims that a decision rests on.
- It does not collect sources. If a claim needs sources checked, do that first; this skill adds the adversarial side.
- It does not certify truth. A verdict records whether a stated attack, using a stated method, succeeded.
- It has no code. Independence and method use depend on the agent following the written instructions.

## Requirements

- An agent that can load skills in the `SKILL.md` format and read the skill folder.
- Best: the agent can start a sub-agent or separate task with a fresh context. Without that, the skill gives you a prompt to run in a new conversation yourself, and says that independence is reduced.
- Optional: web access for the reviewer, for claims that can be checked against sources.

## Try it without installing

1. Download the repository and keep `skills/red-team-gate/` intact.
2. Open the repository folder in an agent that can read files.
3. Use this prompt:

> Read `skills/red-team-gate/SKILL.md` and follow it to review practice claim P5 in `skills/red-team-gate/examples/practice-claims.md`. Run the attack in a fresh sub-agent if you can; if you cannot, tell me and give me the reviewer prompt to run myself. Do not open anything under `docs/` until the review is finished.

Then compare the verdict with the answer key in [VALIDATION.md](../../docs/red-team-gate/VALIDATION.md). P5 is deliberately wrong; a good review refutes it and names the Python version where the guarantee actually starts.

## Install

Copy the whole `skills/red-team-gate/` folder, not just `SKILL.md`, to the skill location your agent uses. The result must end in `red-team-gate/SKILL.md`, without a doubled folder. The answer key and the references stay in `docs/red-team-gate/` and are not part of the installed folder.

| Agent | Project folder | Personal folder |
|---|---|---|
| Claude Code | `.claude/skills/red-team-gate/` | `~/.claude/skills/red-team-gate/` |
| Codex | `.agents/skills/red-team-gate/` | `~/.agents/skills/red-team-gate/` |
| GitHub Copilot | `.github/skills/red-team-gate/` | `~/.copilot/skills/red-team-gate/` |

These are the hosts' documented defaults at the time of writing; check your agent's current documentation. If the destination already exists, compare versions before replacing it. Restart or refresh the agent if the skill does not appear.

Tested on: Codex on macOS, with the folder copied to `~/.codex/skills/red-team-gate/`. The paths in the table above have not been tested.

## First real use

> Use red-team-gate on this claim: "<claim>". The support offered is: "<support>". It matters because "<decision or publication that depends on it>". Report the verdict, the strongest attack, and what was not checked.

> Use red-team-gate on the recommendation in section 3 of this document. First list the claims it rests on and ask me which to review.

## How well does it work?

Two small tests so far, neither an accuracy figure:

- A trial of the skill's private predecessor on five claims, three with planted errors. All three planted errors were refuted; neither true claim was refuted; no claim reached survives.
- An acceptance run of the first release candidate on one agent host, on six practice claims including normative and framework claims. All six verdicts fell within the answer key, and the true control (P8) survived. Reviewers were the same model as the coordinating agent, and the test was not blind. Wording revised after this run has not been re-run.

See [VALIDATION.md](../../docs/red-team-gate/VALIDATION.md) for the setup, the limits, and the cost per review.

## Sources

The methods come from philosophy of science, decision research, and security practice. Full references, how they were checked, and the known limits are in [SOURCES.md](../../docs/red-team-gate/SOURCES.md).
