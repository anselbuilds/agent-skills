# Example report

This example shows the report structure from SKILL.md, Step 5. It is based on the recorded verdict and key evidence of one question from the trial described in the repository's `VALIDATION.md` (practice claim P5). The wording is ours; it is not the reviewer's verbatim output.

```text
Claim (as given):
  Since Python 3.6, the language specification itself guarantees that built-in
  dict objects preserve insertion order, so portable code targeting any
  conforming Python implementation from 3.6 onward may rely on it.

Claim type and priority:
  Definitional (what counts as a language guarantee). Recommended.

Steelmanned claim:
  From Python 3.6 on, insertion order of the built-in dict is a guarantee of the
  language, not only of one implementation, so code may rely on it across
  conforming implementations of 3.6 and later.
  Support: CPython 3.6 shipped an order-preserving dict; later versions kept it.

Independence:
  Sub-agent with a fresh context; it was not told who wrote the claim.

Methods used:
  Counterexamples and boundary cases; falsifiability (what would show the
  "guarantee" is not one).

Verdict: refuted

Strongest attack:
  The Python 3.6 release notes describe the order-preserving dict as an
  implementation detail that should not be relied on. The guarantee became part
  of the language with Python 3.7, about a year later. A conforming 3.6
  implementation could therefore lack the behavior, which contradicts the claim.

Trail (short):
  1. Boundary case: the claim's start point is 3.6, so the 3.6 status decides it.
  2. Checked the 3.6 release notes: implementation detail, not a guarantee.
  3. Checked when the guarantee was declared: 3.7.
  4. Decisive: the claim is false for exactly the version it names as the start.

If weakened, the version that would survive:
  Not applicable (refuted). A true neighboring claim is practice claim P8
  (3.7 and later).

Sources the reviewer read / could not check:
  Python 3.6 release notes; the December 2017 decision that made insertion
  order a language guarantee for 3.7 / nothing material.

Residual uncertainty:
  None material for the verdict.

Decision:
  Left to the user. Recommended: replace "3.6" with "3.7" before relying on it.
```
