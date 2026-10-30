# Red-Team Gate: Review a claim before relying on it

AI assistants sometimes agree with users at the expense of correctness. Anthropic documented this behavior in a 2023 study; OpenAI rolled back a GPT-4o update after excessive agreement in 2025.[1][2] For a claim that matters to a decision or publication, it is worth examining the strongest objection as well as the supporting evidence.

Red-Team Gate takes one claim, its support, and its intended use. It builds the strongest version, then gives it to a reviewer working in a fresh context to attempt a refutation. The report returns a verdict, the strongest attack, its evidence and reasoning, and what remains unknown. If the claim holds only under narrower conditions, it states that version. The decision stays with you.

> Version 0.1.0, experimental prerelease · Maintainer: Ansel · License: MIT
> Method article: [English](https://trigpoint.pub/methods/red-team-a-claim) · [繁體中文](https://trigpoint.pub/zh-Hant/methods/red-team-a-claim)

[Try one practice claim](#try-it-without-installing) · [Read a report](#read-a-report) · [Review the test limits](#how-well-does-it-work)

## When it fits

Use it for a claim a decision or publication rests on: an empirical assertion, a definition, a conceptual distinction, a recommendation, or a framework. Review one claim at a time. For a document, first choose the one to three claims that matter most.

Check sources first when they are needed. This skill adds an adversarial review; it does not collect sources, check every sentence, or replace a straightforward authoritative lookup. A verdict describes what happened under a particular attack, not a certification of truth.

## Why separate the review?

Gary Klein described a research project whose 90-minute kickoff meeting missed a time constraint. His general premortem procedure has a facilitator announce that the plan has failed, participants independently write possible reasons, then take turns sharing them. In the research-project case, someone raised the risk of insufficient time to prepare a business case before the company's product review. The manager revised the plan to account for its decision cycle.[3] This is a human-method example, not a result from this skill.

Philosopher of science and statistics Deborah G. Mayo asks whether a test would be capable of finding flaws if they were present.[4] The skill borrows that question: the reviewer must explain the method and evidence behind the attack. It does not measure statistical severity.

The [skill](SKILL.md) first strengthens the claim without changing its intended meaning, then uses [method cards](references/methods.md) suited to its type. Independence means a separate task and fresh context. A different model is optional; shared blind spots remain possible, and comparative benefits have not been measured. The background research above does not establish that this skill reduces sycophancy.

## Read a report

Start with the strongest attack, then check the reasoning, sources read, evidence the reviewer could not reach, and residual uncertainty. A `survives` verdict means the serious attacks tried failed, not that the claim is proven. A `weakened` verdict includes a narrower version to consider. A `refuted` verdict can concern reliability rather than an empirical disproof; the report should say which. Use the result to decide what to verify, revise, or stop relying on.

> The [example report](examples/example-report.md) is an author-written reconstruction of a recorded practice result and its key evidence, not the reviewer's verbatim output. It reveals P5's answer. To try the review without seeing that answer, go directly to the trial below.

## Requirements

- An agent that can read the skill folder and follow `SKILL.md`. There is no executable code; separation and method use depend on following the instructions.
- A fresh sub-agent or separate task for the attack. If unavailable, the skill provides a prompt to run in a new conversation yourself and reports reduced independence.
- Optional web access for claims that require checking public sources. Unreachable evidence must be reported.

## Try it without installing

1. Download the repository. For a fixed version, use the source archive on the [v0.1.0 release](https://github.com/anselbuilds/agent-skills/releases/tag/red-team-gate-v0.1.0). It contains the collection, not a standalone skill ZIP.
2. Open the extracted repository folder in your agent. Keep `skills/red-team-gate/` intact.
3. Start a new conversation if you have already opened the example report or answer key. Use this prompt:

```text
Read skills/red-team-gate/SKILL.md, the relevant method cards, and only
the P5 claim text in skills/red-team-gate/examples/practice-claims.md.
Follow the skill to prepare the review.

Until the review is finished, do not read
skills/red-team-gate/examples/example-report.md or anything under docs/.

Run the attack in a fresh sub-agent using the self-contained reviewer
prompt from Step 2, with the steelmanned claim, its support, and the full
relevant method cards. Do not pass this README, the examples folder,
answer keys, earlier conversation, or an expected verdict to the reviewer.
Tell the reviewer not to consult this repository or its reports for the
answer; it may consult public primary sources.

If you cannot start a fresh reviewer, stop before the attack and give me
the reviewer prompt to run in a separate conversation.
```

Only after the review finishes, compare the verdict and evidence with the [answer key](../../docs/red-team-gate/VALIDATION.md#5-answer-key). Reproducing a known answer is a walkthrough, not a blind test. These instructions separate the review; they do not enforce a technical access restriction.

## Install

Copy the whole `skills/red-team-gate/` folder, not just `SKILL.md`, to your agent's skill location. The result must end in `red-team-gate/SKILL.md`, without a doubled folder. Include `references/methods.md`: those method cards are part of the skill. The answer key, validation record, source bibliography and article snapshot remain in `docs/red-team-gate/`, outside the installed folder.

| Agent | Project folder | Personal folder |
|---|---|---|
| Claude Code | `.claude/skills/red-team-gate/` | `~/.claude/skills/red-team-gate/` |
| Codex | `.agents/skills/red-team-gate/` | `~/.agents/skills/red-team-gate/` |
| GitHub Copilot | `.github/skills/red-team-gate/` | `~/.copilot/skills/red-team-gate/` |

These are the documented defaults recorded for v0.1.0; check your agent's current documentation. If the destination exists, compare versions before replacing it. Restart or refresh the agent if the skill does not appear.

Tested on: Codex on macOS, using `~/.codex/skills/red-team-gate/`. The paths in the table have not been tested.

## First real use

> Use red-team-gate on this claim: "`<claim>`". The support offered is: "`<support>`". It matters because "`<decision or publication that depends on it>`". Report the verdict, the strongest attack, and what was not checked.

> Use red-team-gate on the recommendation in section 3 of this document. First list the claims it rests on and ask me which to review.

## How well does it work?

Two small tests so far, neither an accuracy figure:

- The private predecessor was tried on five claims. All three planted errors were refuted; neither true claim was refuted; none reached `survives`.
- The first release candidate was tried on six practice claims on one host, including normative and framework claims. All six verdicts fell within the answer key; the true control P8 survived. Reviewers used the same model as the coordinating agent. The test was not blind, and wording revised afterward has not been re-run.

Each review costs a full agent run. The predecessor trial took roughly 80,000 to 115,000 tokens and 3 to 7 minutes per review; the candidate run took 21 to 70 seconds, with token counts unavailable. These different setups are not a speed comparison or a cost estimate for the current package. See [VALIDATION.md](../../docs/red-team-gate/VALIDATION.md) for the setup, limits and untested paths.

## Sources and help

1. Anthropic (2023), [Towards understanding sycophancy in language models](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models).
2. OpenAI (2025), [Expanding on what we missed with sycophancy](https://openai.com/index/expanding-on-sycophancy/).
3. Gary Klein (2007), [Performing a Project Premortem](https://hbr.org/2007/09/performing-a-project-premortem). [Public full-text copy](https://lmscontent.embanet.com/USC/PPD554/Week10/PPD554_W10_HBR_Klein_Performaing_a_Project_Premortem.pdf).
4. Deborah G. Mayo (2018), [Statistical Inference as Severe Testing](https://doi.org/10.1017/9781107286184). Her [Princeton talk abstract](https://psychology.princeton.edu/news-events/2023/deborah-g-mayo-%E2%80%94-professor-emerita-philosophy-virginia-tech) explains the severe-testing requirement.

Full method references and their verification limits are in [SOURCES.md](../../docs/red-team-gate/SOURCES.md). The [article snapshot](../../docs/red-team-gate/method.md) is licensed CC BY 4.0; the website is canonical. These documents and `VALIDATION.md` live under `docs/`, so their relative links work in the repository but not in a standalone installed copy.

For questions or bugs, use the repository's [Issues](https://github.com/anselbuilds/agent-skills/issues). For private vulnerability reports, see [SECURITY.md](../../SECURITY.md). Maintained by Ansel, with no promised response time.

---

Trigpoint｜先讀前人，站上巨人的肩膀，再談創新。
