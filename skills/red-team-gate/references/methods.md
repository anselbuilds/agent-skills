# Method cards

One card per method. Paste whole cards into the reviewer prompt (SKILL.md, Step 2). Each card ends with a short source note; full references are in `SOURCES.md` in the skill's repository (not part of the installed folder).

| Claim type | Cards |
|---|---|
| Empirical | Severe testing · Bayesian disconfirmation |
| Definitional | Counterexamples and boundary cases · Falsifiability |
| Conceptual | Dialectic · Scope-breaking |
| Normative | Argument validity · Pre-mortem |
| Framework | Research-programme test · Falsifier demand · Self-validation check |
| Any type | Devil's advocate · Adversarial collaboration · Red teaming |

---

## Severe testing

**Use for:** empirical claims.

**Core question:** If the claim were false, how likely is it that the evidence offered would have come out looking worse for it?

A claim passes a test only when the test had a high chance of exposing the claim if it were false. Passing a test that could hardly fail is close to no support. Statistical significance on its own is not a severe test.

**Attack steps:**
1. For each piece of supporting evidence, ask how well that test could have detected the claim being false.
2. Check whether test conditions were chosen in a way that made failure unlikely, for example by measuring only where the effect was expected.
3. Check whether the conclusion rests on a single test. Strong support needs several independent tests that could each have failed.

**Misuses:** treating "significant" as "severely tested"; counting many weak tests as one strong test.

*Source: Mayo (1996; 2018).*

---

## Bayesian disconfirmation

**Use for:** empirical claims.

**Core question:** What evidence would most lower your confidence in this claim, and has anyone looked for it?

Evidence confirms a claim when it makes the claim more probable than before, and disconfirms it when it makes the claim less probable. The useful search is for the observation that would lower confidence the most.

**Attack steps:**
1. List the observations most likely to appear if the claim were false.
2. Check whether those observations were actually looked for.
3. If such evidence exists, lower the confidence and mark the claim weakened or refuted, depending on how much it moves.

**Misuses:** stacking more confirming instances instead of searching for the disconfirming one.

*Source: Carnap (1950; 2nd ed. 1962) on confirmation as increase in probability; Hempel (1945) on the logic of confirmation.*

---

## Counterexamples and boundary cases

**Use for:** definitional claims.

**Core question:** Is there a case the definition includes that it should exclude, or excludes that it should include?

**Attack steps:**
1. Build a case that meets the definition but that competent users of the term would reject.
2. Build a case that competent users would accept but that the definition rules out.
3. Probe the edges: borderline cases, limiting cases, cases where two parts of the definition pull apart.

**Misuses:** inventing cases so artificial that no one uses the term for them; confusing a stipulated definition (which cannot be wrong, only unhelpful) with a claim about existing usage.

---

## Falsifiability

**Use for:** definitional claims and framework claims.

**Core question:** What observation would show this to be wrong?

State first what would count against the claim. If no possible observation could count against it, the claim makes no testable assertion.

**Attack steps:**
1. Ask for, or try to state, a concrete observation that would contradict the claim.
2. Check whether the claim is written so that any outcome can be absorbed ("whatever happens, it fits").
3. Check whether the stated conditions for failure are clear enough that two people would agree when they occur.

**Misuses:** confusing falsifiability with verifiability. Popper's criterion is about whether a claim can be contradicted by observation, not whether it can be confirmed.

*Source: Popper (1934, English 1959; 1963).*

---

## Dialectic

**Use for:** conceptual claims, and normative claims that rest on concepts.

**Core question:** What is the strongest opposing position, and what survives when the two meet?

**Attack steps:**
1. Build the strongest opposing position (not a weak one).
2. Bring the two into contact: find where they are incompatible, what each assumes without saying, and which edge cases break each.
3. Look for a position that keeps what is right in both. If the original claim holds only after this narrowing, the verdict is weakened.

**Misuses:** staging a debate with a feeble opponent. Also: attributing the "thesis, antithesis, synthesis" formula to Hegel. Scholars commonly trace the triad to Fichte; describe the method instead of naming the formula.

*Source: the Socratic method of questioning (elenchus) as analyzed by Vlastos (1983).*

---

## Scope-breaking

**Use for:** conceptual claims.

**Core question:** Where does this concept or explanation stop working?

**Attack steps:**
1. Move the claim to neighboring domains, scales, or periods and check whether it still holds.
2. Look for cases where the key terms change meaning, so that the claim seems to apply but compares unlike things.
3. Report the boundary. A claim stated as general but true only inside a boundary is weakened, with the boundary as the narrower version.

**Misuses:** declaring a claim false because it fails far outside the scope its author stated.

*Source: Kuhn (1962) on concepts that do not carry across paradigms.*

---

## Argument validity

**Use for:** normative claims.

**Core question:** Do the conclusions actually follow from the premises?

**Attack steps:**
1. Write the argument as numbered premises and a conclusion.
2. Find hidden premises the conclusion needs. Ask whether each is true and whether the author would accept it stated openly.
3. Find jumps: a value assumed without argument, a "can" turned into a "should", a group claim applied to every member.
4. Check the scope words ("every", "always", "never"). Most normative claims fail first on scope.

**Misuses:** attacking the author's motives instead of the argument.

---

## Pre-mortem

**Use for:** normative claims, policies, plans, and recommendations.

**Core question:** It is six months later and following this claim has clearly gone wrong. What happened?

Asking "what could go wrong?" invites reassurance. Declaring that failure has already happened, and asking why, produces more specific failure reasons.

**Attack steps:**
1. State: "Assume this was adopted and, six months later, it caused a serious problem."
2. List the three most likely causes.
3. For each, judge whether it is likely and whether the claim can be narrowed or conditioned to avoid it.

**Misuses:** treating it as forecasting. The mechanism is the certainty that failure occurred, not imagining the future.

**Correction to a common citation:** the often-quoted figure that this technique improves the identification of reasons by 30% is widely repeated from Klein (2007), who attributes it to Mitchell, Russo and Pennington (1989). That study reports that certainty about the outcome, not the shift in time perspective, drove the effect, and the 30% figure was not located verbatim in its accessible text. Do not repeat the number as established.

*Sources: Klein (2007); Mitchell, Russo and Pennington (1989); Kahneman (2011, ch. 24).*

---

## Research-programme test

**Use for:** framework claims.

**Core question:** When this framework meets a problem, do its adjustments lead to new predictions that come true, or only to explanations of what is already known?

A framework has a core that its users will not give up and a surrounding set of auxiliary assumptions that they adjust when trouble appears. Adjusting the auxiliaries is normal for any framework. What matters is the pattern over time:

- **Progressive:** adjustments predict some new facts, and some of those predictions are later confirmed.
- **Degenerating:** adjustments do not lead to confirmed new predictions; they are made to fit each anomaly after the fact.

A known fact can still count as "new" if the framework was not built or adjusted to fit it (Zahar's "use-novelty", later adopted by Lakatos).

**Attack steps:**
1. Identify the core: which assumptions will its users never give up?
2. Identify the auxiliaries: what gets adjusted when the framework meets a counterexample?
3. Look at the most recent adjustments. Did any of them produce a new prediction that was then confirmed? If none did, report the framework as degenerating and the claim as not ready to rely on.

This test needs a history of adjustments. If the material shows only a snapshot, say that the test cannot be run; do not call the framework degenerating on that basis. Report any missing falsifier or self-validation separately, using those cards.

**Misuses:** rejecting a framework because a single counterexample exists (frameworks are judged over time); counting a pure redefinition of terms as an adjustment; calling a framework degenerating without a record of how it was adjusted.

*Source: Lakatos (1970).*

---

## Falsifier demand

**Use for:** framework claims.

**Core question:** What result would make the framework's author abandon or revise it?

**Attack steps:**
1. Ask the author, or infer from the material, what outcome would count against the framework.
2. If no answer exists, the framework claim cannot be relied on as knowledge. Report refuted (no falsifier) or weakened (a falsifier exists only for a narrower version). Here "refuted" means not reliable as stated, not shown to be false.

*Source: Popper (1934, English 1959).*

---

## Self-validation check

**Use for:** framework claims.

**Core question:** Is the only evidence for this framework produced by the framework itself?

**Attack steps:**
1. List the evidence offered.
2. Mark evidence that was generated, selected, or interpreted using the framework.
3. If nothing independent remains, say so. The claim is at best weakened.

---

## Devil's advocate

**Use for:** any claim, layered on another method.

Assign someone, or the reviewer, the explicit duty to argue against the claim, regardless of personal view. The point is that dissent does not depend on anyone being willing to be unpopular.

*Source: the Catholic Church's office of the Promoter of the Faith; Janis (1972) on its use against groupthink.*

---

## Adversarial collaboration

**Use for:** contested empirical or conceptual claims with an existing opposing position.

When two positions exist, agree on the test and on what each result would mean before running it. Disagreement then ends in a shared result instead of a longer debate.

*Sources: Latham, Erez and Locke (1988); Mellers, Hertwig and Kahneman (2001).*

---

## Red teaming

**Use for:** any claim; it names the stance of the whole review.

A separate team takes the view of an outside opponent and attacks the plan or claim. Its value comes from independence: it does not share the authors' assumptions or incentives.

*Sources: Goldhamer and Speier (1959) on political-military gaming; Zenko (2015).*
