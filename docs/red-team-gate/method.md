# Red-team a claim before you build on it

> Snapshot of article version 1.0 at <https://trigpoint.pub/methods/red-team-a-claim>, written for red-team-gate v0.1.x. The web page is the canonical version; corrections appear there first. Text by Ansel, licensed CC BY 4.0 (see [`LICENSE-CONTENT`](../../LICENSE-CONTENT)).

Most of the claims people act on have been checked by the people who wanted them to be true. That is not dishonest. It is how checking usually happens: whoever writes a claim also looks for problems with it, in the same sitting, with the same assumptions. The search tends to find support.

Checking sources helps, but it answers a different question. Good sources tell you a claim is well grounded. They do not tell you whether the claim survives someone trying hard to break it. For a whole class of claims, sources cannot settle anything: a conceptual distinction, a “we should”, a framework someone built for their own work. There is no primary document that confirms them.

This article describes a small, repeatable procedure for that second question, and an agent skill that runs it.

## The procedure

**1. Say what kind of claim it is.** A claim about the world (empirical), about what a word covers (definitional), about how ideas relate (conceptual), about what to do (normative), or about a home-grown framework. The kind decides how to attack it. Testing a conceptual claim with statistics is a category error; so is debating an empirical one without looking at the evidence. Mixed claims get split.

**2. Build the strongest version first.** Before attacking, state the claim as well as it can be stated: add the support its author left implicit, make hidden premises explicit. Beating a weak version proves nothing. The opposite mistake also exists: a version so strong that its author would not hold it is a different claim.

**3. Give it to a reviewer with no stake in it.** The reviewer does not know who proposed the claim or why it matters. Its only job is to refute it, and its default verdict is “refuted” until the claim withstands the attack. It works in a fresh context, without the author's notes. With an AI agent, that means a sub-agent or a new conversation; the chat that built the argument does not count.

**4. Attack with a method, not an opinion.** Each kind of claim has methods with a long record:

- Empirical claims: would the evidence have looked worse if the claim were false? A test the claim could hardly fail is weak support (Mayo's severe testing)[^1] [^2]. And which observation would most lower confidence, and has anyone looked for it?
- Definitional claims: cases the definition includes but should not, and the reverse; and whether any observation could count against it at all (Popper)[^3].
- Conceptual claims: the strongest opposing position, where the two collide, and where the concept stops working.
- Normative claims: whether the conclusion follows from the premises, which premise is hidden, and a pre-mortem[^4]: “it is six months later and following this went badly; why?”
- Frameworks: every framework gets adjusted when it meets a problem; that alone is not a fault. The question is whether, over time, the adjustments ever lead to new predictions that are later confirmed, or only fit each problem after the fact (Lakatos)[^5]. A known fact can count as new if the framework was not built to fit it (following Zahar's use-novelty; the original passage has not yet been checked first-hand)[^6]. The test needs a history of adjustments; without one, it cannot be run. And what result would make the framework's author give it up?

**5. Report one of three verdicts.** Survives: every serious attack, run with the method, failed. Weakened: the claim holds in a narrower scope or with less confidence. Refuted: a decisive counterexample, contrary evidence, or no possible falsifier. A refutation for lack of a falsifier says the claim cannot be relied on as stated; it does not show the claim is false. Weakened is a useful result: it points to the version of the claim that can actually be relied on. “We searched and found nothing” is not survives.

The verdict goes back to whoever owns the decision. It is an input, not an approval.

## Two corrections we built in

Writing method cards meant checking the methods themselves, and two popular citations did not hold up.

The pre-mortem is often sold with a figure: imagining that a project has already failed improves people's ability to find reasons by 30%. The figure is repeated from a 2007 article[^4] that attributes it to a 1989 study[^7]. That study points to certainty about the outcome, not the imagined time shift, as what drove the effect, and we could not find the 30% figure in its accessible text. The technique is still useful; the number should not be repeated as a fact.

The second is the “thesis, antithesis, synthesis” formula, usually credited to Hegel. The triadic terms are Fichte's; Hegel never adopted them to describe his own philosophy[^8]. The method cards describe the moves (strongest opposing position, collision, a position that keeps what is right in both) instead of naming the formula.

## How well it works so far

We ran one small trial of the private version: five claims, three with planted errors, each reviewed by a fresh agent using a different model from the one that wrote the claims. The three planted errors were all refuted, with the correct mechanism and the primary source named. The two claims meant to be true were not refuted, but both were marked weakened, because the reviewers found real flaws in the wording. No claim reached survives.

We then ran the first public candidate on one agent host, on six practice claims that include a planted-error framework, an overreaching recommendation, and a clean true claim. All six verdicts fell within the answer key, and the true claim survived. The reviewers there were the same model as the agent coordinating the test, and the test was not blind. We revised some wording after that run and have not re-run it.

Together these two small tests are a first reading and do not amount to an accuracy figure. They used different versions and reused three claims, so their results should not be added up; and most of the claims could be checked against public sources, which makes the reviewer's job easier than it is for most normative or framework claims. Each review also costs a full agent run: in the first trial, roughly 80,000 to 115,000 tokens and a few minutes.

## When to use it

It suits the few claims a decision or a publication actually rests on, especially claims no document can settle. Running it over every sentence of a report does not.

## Get the skill

The skill is on GitHub: [github.com/anselbuilds/agent-skills](https://github.com/anselbuilds/agent-skills). The skill itself, its method cards and the practice claims are in `skills/red-team-gate/`. The answer key for the practice claims, the full trial notes and the references are in `docs/red-team-gate/`, which is not installed with the skill.

## References

**How to read the source notes.** “Bibliographic details checked” means author, year, title and venue were confirmed. It does not mean the source's claims were checked. “Consistent with the abstract” means the claim agrees with the paper's abstract. It does not include sentence-by-sentence checking against the full text. “Matched against the full text” means the claim was compared with the text of the source itself. Definitions as of 2026-09-20.

References for all the method cards, and how they were checked, are in [`docs/red-team-gate/SOURCES.md`](SOURCES.md) on GitHub.

[^1]: Mayo, D. G. (1996). Error and the Growth of Experimental Knowledge. University of Chicago Press. <https://doi.org/10.7208/chicago/9780226511993.001.0001> Bibliographic details checked against the publisher's record. Provenance double-checked across models.

[^2]: Mayo, D. G. (2018). Statistical Inference as Severe Testing: How to Get Beyond the Statistics Wars. Cambridge University Press. <https://doi.org/10.1017/9781107286184> Bibliographic details checked against the publisher's record. Provenance double-checked across models.

[^3]: Popper, K. (1935). Logik der Forschung. Springer. <https://doi.org/10.1007/978-3-7091-4177-9> Bibliographic details checked against the publisher's record.

[^4]: Klein, G. (2007). Performing a project premortem. Harvard Business Review, 85(9), 18–19. <https://hbr.org/2007/09/performing-a-project-premortem> Bibliographic details checked against the publisher's record. Provenance double-checked across models.

[^5]: Lakatos, I. (1970). Falsification and the methodology of scientific research programmes. In I. Lakatos & A. Musgrave (Eds.), Criticism and the Growth of Knowledge (pp. 91–196). Cambridge University Press. <https://doi.org/10.1017/CBO9781139171434.009> Bibliographic details checked against the publisher's record. Provenance double-checked across models.

[^6]: Zahar, E. (1973). Why did Einstein's programme supersede Lorentz's? (I). The British Journal for the Philosophy of Science, 24(2), 95–123. <https://doi.org/10.1093/bjps/24.2.95> Bibliographic details checked against the publisher's record.

[^7]: Mitchell, D. J., Russo, J. E., & Pennington, N. (1989). Back to the future: Temporal perspective in the explanation of events. Journal of Behavioral Decision Making, 2(1), 25–38. <https://doi.org/10.1002/bdm.3960020103> Bibliographic details checked against the publisher's record. Consistent with the abstract. Provenance double-checked across models.

[^8]: Maybee, J. E. (2020). Hegel's dialectics. In E. N. Zalta (Ed.), The Stanford Encyclopedia of Philosophy (Winter 2020 ed.). <https://plato.stanford.edu/archives/win2020/entries/hegel-dialectics/> Bibliographic details checked against the publisher's record. Claims matched against the full text.
