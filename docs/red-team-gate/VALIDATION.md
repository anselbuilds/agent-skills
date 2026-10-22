# Validation

What has been tested, what has not, and the answer key for the practice claims.

**Status:** release candidate, not yet released. Two small tests so far: a trial of the private predecessor (September 2026) and an acceptance run of the first release candidate on one agent host (October 2026). Neither is an accuracy figure. The method wording revised after the acceptance run (§3) has not been re-run.

## 1. Planted-error trial of the private predecessor, September 2026

The method in this skill was first used privately. Its private predecessor was tested once on five claims.

**Setup**

- One model wrote five claims, each with the strongest supporting argument it could give, as if Step 1 had already been done. Three claims contained a planted error; two were meant to be true. Only the writer knew which.
- Each claim went to a separate fresh reviewer, a different and larger model, given the reviewer role, the default-refuted rule, and the method cards for the claim type. Reviewers could read public sources on the web and could not read local files. No reviewer knew the answers or that this was a test.
- Scoring rules were fixed before the run. For a planted error: refuted, or weakened while naming the real mechanism, counts as caught; survives counts as missed. For a true claim: refuted counts as wrongly rejected; survives or weakened is acceptable.

**Results** (practice claims P1 to P5 in `skills/red-team-gate/examples/practice-claims.md`)

| Claim | Type | Intended truth | Verdict | Outcome |
|---|---|---|---|---|
| P1 | empirical | true | weakened | acceptable |
| P2 | empirical | false | refuted | caught |
| P3 | conceptual | true | weakened | acceptable |
| P4 | conceptual | false | refuted | caught |
| P5 | definitional | false | refuted | caught |

- Planted errors: 3 of 3 caught, 0 missed.
- True claims: 0 of 2 wrongly rejected.
- No claim reached survives.

**Limits of this result**

1. Five claims. With 3 of 3 caught, the 95% upper bound on the miss rate is still about 63%.
2. Both "true" claims had real wording flaws that the reviewers found (see the answer key), so the trial had no clean true control.
3. All five claims could be checked against public primary sources. Normative and framework claims were not tested.
4. No same-model baseline: the writer and the reviewers were different models.
5. Reviewers reported evidence-access limits (some primary PDFs could not be read). The verdicts did not depend on them.
6. The same model wrote the claims and scored the results, with answers and scoring rules fixed in advance.

**Cost:** 80,000 to 115,000 tokens and 3 to 7 minutes per review; about 470,000 tokens in total.

## 2. Acceptance run of the first release candidate, October 2026

**Setup**

- Version tested: the first release candidate, before the wording revisions made after this run (the last bullets of §3).
- Host: one desktop agent (Codex) on macOS, arm64. The skill folder was copied to the agent's personal skill folder (`~/.codex/skills/red-team-gate/`) and appeared in the agent's skill list.
- Claims P2, P4, P5, P6, P7 and P8. Each went to a fresh sub-agent with no parent conversation, author identity, earlier drafts, or answer key, using the reviewer prompt from SKILL.md unchanged plus the full method cards. Reviewers could look up public sources.
- The reviewers were the same model as the coordinating agent, which built the steelman and scored the result. There was no cross-model comparison.
- A first pass used an abbreviated prompt and was excluded; the six claims were rerun with six new reviewers and the full prompt. In the first pass P7 was weakened; in the rerun it was refuted. Both fall inside the answer key, which shows the label still depends on judgment. The coordinator knew the answer key during the rerun; the reviewers never saw it. This was not a blind or preregistered test.

**Results**

| Claim | Type | Verdict | Matches answer key | Decisive point (summary) |
|---|---|---|---|---|
| P2 | empirical | refuted | yes | RFC 8446 allows a pre-shared-key mode without a fresh Diffie-Hellman exchange. |
| P4 | conceptual | refuted | yes | Universal statements over unbounded domains can be falsified but not verified by finitely many cases, so the two criteria differ. |
| P5 | definitional | refuted | yes | Insertion order was an implementation detail in 3.6 and became a language guarantee in 3.7. |
| P6 | framework | refuted | yes | Failures are explained away as "superficial" use, so nothing can count against the model; the only evidence is the facilitator's own judgment. |
| P7 | normative | refuted | yes | Catching more defects does not imply that two reviews have net benefit for every change; urgent fixes are a counterexample. |
| P8 | definitional | survives | yes | The attacks tried did not break the 3.7 language guarantee. |

- Six of six within the answer key. This is a check that the first candidate worked as written on one host, not an accuracy figure.
- Review time: 21 to 70 seconds per claim, 271 seconds in total. Token counts were not available from the host and are not estimated.

**Notes on the results**

- P6: the reviewer also called the framework degenerating although the material had no history of adjustments. That part of its reasoning was not supported; the research-programme card now says the test cannot be run on a single snapshot. The missing falsifier and self-validation findings stand on their own.
- P6 and P7: "refuted" here means the claim cannot be relied on as stated. For P6 it is not an empirical disproof, and the P7 counterexample is a hypothetical, not an observed incident.

## 3. How this package differs from the private predecessor

The method steps, verdicts, and method cards are the same in substance. Changes:

- Removed everything tied to the private setting: internal review stages, internal record-keeping, internal approval roles, and a coverage-audit mode.
- Rewrote the reviewer prompt and all instructions in English for general agents, and added a fallback for agents that cannot start a fresh sub-agent.
- Corrected the research-programme card: "degenerating" means that adjustments yield no confirmed new predictions, rather than "only absorbs known anomalies" (which every framework does). This follows the reviewer's finding on P3 in the September trial.
- After the October acceptance run: the research-programme card requires a history of adjustments; the falsifier card and Step 4 state that "refuted" for a missing falsifier is a judgment about reliability.
- Added practice claims P6 to P8.

## 4. Not yet tested

- The wording revised after the October acceptance run (§3: research-programme card, falsifier card, Step 4).
- Installation and discovery on any host other than the one above, including the default paths listed in `skills/red-team-gate/README.md`.
- The fallback path for agents without sub-agents.
- Any measured effect of using a different model as reviewer.
- Long documents, and claims outside these eight practice claims.
- Token cost on the current package.

## 5. Answer key

| Claim | Intended | Recorded results |
|---|---|---|
| P1 | true | September: weakened. All stated facts hold, but IANA lists 418 as unused and the current HTTP standard only reserves it, so it is strictly an HTCPCP code rather than a registered HTTP status code. |
| P2 | false | September and October: refuted. RFC 8446 itself states that a pre-shared key used alone gives no forward secrecy, and that 0-RTT data is not forward secret. |
| P3 | true, with a flaw | September: weakened. "Degenerating" means the progress condition fails, not "only accommodates known anomalies", which all programmes do; Lakatos also later accepted use-novelty, so known facts can count as novel. |
| P4 | false | September and October: refuted. Popper presents falsifiability as the criterion of demarcation; universal and existential statements come out opposite under the two criteria; verifiability was a criterion of meaning, not of demarcation. |
| P5 | false | September and October: refuted. The 3.6 release notes call the ordering an implementation detail; the language guarantee came with 3.7. |
| P6 | false (planted) | October: refuted. Planted faults: any failure is explained away as "superficial" use, so no observation can count against the model; the only evidence is the facilitator's own judgment using the model. A good review names the missing falsifier and the self-validation. |
| P7 | overreaching | October: refuted (weakened in the excluded first pass). Hidden premise that defects caught is the only value; "every change" ignores cost, delay, and urgent fixes. Weakened or refuted are both acceptable; survives is not. |
| P8 | true | October: survives. Weakened on wording only would also be acceptable; refuted would not. |
