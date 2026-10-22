---
name: red-team-gate
description: Independent adversarial review of one claim before you accept, publish, or build on it. First builds the strongest version of the claim, then hands it to a fresh reviewer with no stake in it, whose job is to refute it using a method chosen for the claim type (empirical, definitional, conceptual, normative, or framework). Returns survives, weakened, or refuted, with the strongest attack and the reasoning trail. Use when asked to red-team a claim, stress-test an argument, find the strongest counterargument, or check a framework, policy, or recommendation before adopting it. Not a fact-checker for whole documents and not a source-collection workflow.
---

# Red-Team Gate

Put a claim through an independent attempt to refute it before anyone relies on it.

Checking sources tells you whether a claim is well supported. It does not tell you whether the claim survives a serious attack. When the person who wrote a claim also searches for counterexamples, in the same conversation and with the same model, the search tends to confirm. This skill separates the two jobs: it builds the claim's strongest form, gives that form to a reviewer whose only goal is to break it, and reports what happened.

The verdict is input to a human decision. It never approves a claim on its own.

## When to use

- A claim will be published, taught, or used as the premise of a decision.
- A conceptual claim, a "should" statement, or a home-grown framework has no primary source that could settle it.
- You wrote the claim yourself, or the people reviewing it share your stake in it.
- You want the strongest counterargument, not a balanced summary.

## When not to use

- Collecting or verifying sources for a whole report: use a research or citation workflow first, then bring the load-bearing claims here.
- Routine facts that a single authoritative lookup settles.
- Many claims at once. Run one claim per review. Given a document, list candidate claims and ask the user which one to three are load-bearing.

## Inputs

1. **The claim**: one sentence or a short paragraph, as the author means it.
2. **Its support**: the reasons and evidence offered for it.
3. **Its use**: what decision or publication depends on it. This sets how hard to look, not what the answer should be.
4. Optional: source material the reviewer may read.

If the claim is vague, ask one question to pin it down before Step 0. Do not attack a version the author would not recognize.

## Workflow

### Step 0: Classify the claim

| Type | How to recognize it | Priority | Main methods (see `references/methods.md`) |
|---|---|---|---|
| Empirical | Says what is the case in the world; observation could bear on it | Recommended | Severe testing; Bayesian disconfirmation |
| Definitional | Says what a term means or what falls under a category | Recommended | Counterexamples and boundary cases; falsifiability |
| Conceptual | Says how ideas relate, or that a distinction or explanation holds | Run it | Dialectic; scope-breaking |
| Normative | Says what someone should do or value | Run it | Argument validity; pre-mortem |
| Framework | Says a home-grown model, method, or framework is valid or useful | Run it | Research-programme test; falsifier demand; self-validation check |

"Run it" types have no primary source that can settle them, so an independent attack is the main check available. For empirical and definitional claims, a source check is still needed; this gate adds the adversarial side and does not replace it.

A claim that mixes types (for example, a fact plus a recommendation) should be split. Review each part under its own type.

Skip only when the claim is already rejected or the user explicitly declines the review. Record the reason in the report.

### Step 1: Steelman first

Build the strongest version of the claim before attacking it.

1. State the core claim.
2. Add the best available support, including support the author left implicit.
3. Make hidden premises explicit.
4. Write the steelmanned claim in one sentence, followed by its support structure.

Rules:

- Charity is not agreement. After building the strongest version, attack it with full force.
- Do not over-strengthen. A version so strong that the author would not hold it is a different claim. When unsure, ask the user.
- If even the strongest version is not internally consistent, stop and report **refuted** with that reason.

### Step 2: Hand the claim to an independent reviewer

The attack must run in a fresh context. Independence comes from four conditions:

| Condition | What it means in practice |
|---|---|
| No author stake | Do not tell the reviewer who proposed the claim or why it matters to them. |
| Goal is refutation | The reviewer looks for the strongest counterevidence, counterexample, scope limit, or missing falsifier. Default verdict is refuted until the claim withstands the attack. |
| Method grounding | Paste the relevant method cards from `references/methods.md` into the prompt, so the attack follows a stated method rather than opinion. |
| Fresh context | The reviewer does not see this conversation, the author's notes, or earlier drafts. |

A different model as reviewer is optional. It may reduce shared blind spots, but this release has no measurement showing that it improves results.

**How to run it:**

- If your agent can start a sub-agent or separate task, start one and give it only the prompt below.
- If it cannot, say so to the user: independence is reduced. Offer the prompt so the user can run it in a new conversation or another model, and continue at Step 4 with the pasted result.
- Never run the attack in the same context as the steelman and call it independent.

If the reviewer can read sources or browse, it must cite what it actually read and name what it could not access. Unread sources do not count as evidence either way.

Reviewer prompt (fill the brackets; keep everything inside the block self-contained):

```text
ROLE
You are an adversarial reviewer. Your only job is to refute the claim below.
You have no stake in it surviving. Your default verdict is REFUTED unless the
claim withstands your strongest attack.

CLAIM (strongest version)
[steelmanned claim and its support structure from Step 1]

CLAIM TYPE AND METHOD
[claim type from Step 0]
[paste the full method cards for this type, plus any cross-cutting card you use]

RULES
- Attack the strongest version above, not a weaker one.
- Use the method. Say which step of the method each attack comes from.
- If you consult sources, cite exactly what you read. Mark anything you could
  not access. Do not treat an unread source as support or as counterevidence.
- "I found nothing" is not a pass. A claim survives only if you ran the method
  and every serious attack failed.

TASK
Find the single strongest attack: a refutation, counterexample, scope limit,
missing falsifier, hidden premise, or sign of a degenerating framework.
Say whether it is decisive.

OUTPUT
verdict: survives | weakened | refuted
strongest attack: [the attack, in two to four sentences]
trail: [the reasoning chain, method step by method step]
if weakened: [the narrower scope or lower confidence at which the claim would survive]
sources read: [list, or "none"]
could not check: [list, or "nothing"]
```

### Step 3: Method-specific attack

The reviewer runs the methods for the claim type. `references/methods.md` has one card per method: what it asks, the attack steps, and common misuses. Paste whole cards into the prompt; do not paraphrase them into something weaker.

Cross-cutting cards (devil's advocate, adversarial collaboration, red teaming) can be added to any type.

### Step 4: Verdict

| Verdict | Meaning | Usual next step |
|---|---|---|
| survives | Every serious attack, run with the method, failed. | The decision-maker may rely on the claim, noting what was not checked. |
| weakened | The claim holds only with a narrower scope or lower confidence. | Revise the claim to the narrower version, or use it with the limit stated. |
| refuted | A decisive counterexample, counterevidence, missing falsifier, or failure of the strongest version. | Do not rely on the claim. Rework it or drop it. |

- Weakened is a normal and useful result: it gives you the version of the claim you can rely on. It is not a failure of the claim's author.
- Refuted means the claim cannot be relied on as stated. When the reason is a missing falsifier or evidence that only the claim itself produced, that is a judgment about reliability, not a logical or empirical disproof. Say which kind it is in the report.
- A quick search that turns up nothing is not survives. Survives requires the method to have been run.
- If the reviewer could not access the evidence its attack needed, report that gap. Do not upgrade the verdict because the attack was incomplete.

### Step 5: Report and hand back the decision

Write the report in this shape:

```text
Claim (as given):
Claim type and priority:
Steelmanned claim:
Independence: [sub-agent | separate conversation run by the user | reduced: explain]
Reviewer model (if known):
Methods used:
Verdict: survives | weakened | refuted
Strongest attack:
Trail (short):
If weakened, the version that would survive:
Sources the reviewer read / could not check:
Residual uncertainty:
Decision: [left to the user]
```

The user, or whoever owns the decision, decides. If you or the user disagree with the reviewer's verdict, write the override, the reason, and one sentence quoting the reviewer's strongest attack, so the disagreement stays visible.

## Anti-patterns

- Attacking a weak version (a straw man) and counting the win.
- Running the attack in the same context that built or defended the claim.
- Searching for support instead of for refutation.
- Treating "no counterexample found in a quick search" as survives.
- Attacking without a method: opinion is not a review.
- Using the wrong method for the type, such as statistical testing on a conceptual claim.
- Letting the verdict approve the claim automatically.
- Accepting a framework claim when no one can say what observation would count against it.
- Attributing the "thesis, antithesis, synthesis" formula to Hegel (see `references/methods.md`, Dialectic).

## Limits

- Testing so far is small: a five-claim trial on this skill's private predecessor, and a six-claim acceptance run of the first release candidate on one agent host, both with planted errors and true controls. The wording revised after that run has not been re-run. Neither test is an accuracy figure. The details, the full answer key for the practice claims, and the references are in `VALIDATION.md` and `SOURCES.md` in the skill's repository, not in this installed folder. `examples/example-report.md` does show the answer to practice claim P5, so give a reviewer only the self-contained prompt from Step 2, never the examples folder.
- A review is only as good as the evidence the reviewer can reach. Paywalled or offline sources limit it.
- Each review is a full agent run. In the earlier trial, one review with web access took roughly 80,000 to 115,000 tokens and 3 to 7 minutes; in the acceptance run, reviews took 21 to 70 seconds each (token counts were not available).
