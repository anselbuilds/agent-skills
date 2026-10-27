---
name: concept-relations
description: A small, deliberately incomplete vocabulary of typed links between concept notes, with a test for choosing each type. Use it to propose links from the text of notes, or to check links that already exist, in a glossary, a set of course notes, or a personal knowledge base. Types are prereq (A must be understood before B), specializes (B is a kind of A), and contrasts (rival answers to the same question). Every link carries a one-sentence reason. Not for causal models, argument maps, or formal ontologies.
---

# Concept Relations

A small vocabulary of typed links between concept notes, and a procedure for choosing them.

Most note collections link concepts without saying what a link means. A reader cannot tell whether it means "read this first", "this is a kind of that", or "this is a rival view". This skill gives an agent a few link types, a test for each, and some rules that keep the result consistent enough for a tool to draw or check.

> Vocabulary v0.1 · skill 0.1.0, experimental · Maintainer: Ansel
> This vocabulary is a lagging public snapshot of the one the maintainer uses in their own concept library. The internal version is the reference and may change without notice. This public version follows on its own release schedule, and every change is listed in the changelog.

## What it covers, and what it leaves out

The vocabulary is minimal on purpose. It does not claim to capture every relation between concepts. It has no type for:

- part and whole (one concept is a component of another);
- intellectual lineage (one idea or author built on another);
- cause and effect;
- application (a theory or method used on a phenomenon, a problem, or a situation);
- either-or prerequisites (any one of several concepts would be enough);
- mutual prerequisites (two concepts that are defined through each other).

Write these in the text of the note.

**A missing link does not mean two concepts are unrelated.** It means the relation is not one of these types, or nobody has recorded it yet.

Cause and effect is left out by design. A causal claim is an argument: it needs evidence and can be disputed, so it belongs in prose, next to its evidence. A link would present it as settled structure.

Application was tested as a fourth type and left out: agreement on it fell below the bar. See Limits.

## When to use

- You keep concept notes and want links that a reader or a tool can interpret.
- You want an agent to propose links from the text of notes, with a reason for each.
- You want to check an existing set of typed links for contradictions.

## When not to use

- Modelling causes, mechanisms, or chains of evidence.
- Mapping the structure of an argument.
- Building a formal ontology for logical inference. These types come with tests and rules, not formal semantics.

## The types

A link is declared on one note (the source) and points to another note (the target). Write the identifiers exactly as shown, in lower case, so that tools can read them.

| Identifier | Meaning | Source → target | Test question |
|---|---|---|---|
| `prereq` | The source cannot be understood without first understanding the target. | dependent concept → what it depends on | Could you explain the source to someone who does not yet understand the target? If not, the target is a prerequisite. |
| `specializes` | The source is a kind, special case, or subtype of the target. | narrower → broader | Is every instance of the source also an instance of the target? |
| `contrasts` | Source and target are rival answers to the same question, reached by different reasoning. | either end; the link is symmetric | Do both offer an answer to the same question, by different reasoning? |

### `prereq`

- All prerequisites are required. If any one of several concepts would do, that is an either-or prerequisite: do not link any of them, and write the alternatives in prose. Linking all of them would overstate what the reader needs.
- No cycles, of any length. If A needs B and B needs C, then C cannot need A. Two concepts that can only be learned together are mutual prerequisites: describe them in prose.
- You may list any prerequisite you know of, direct or indirect. A tool that draws the graph removes a link whenever the same dependency is already reached through a longer path, so readers see only direct prerequisites. Collections differ in how complete their chains are, so authors are not asked to decide which prerequisites are direct.
- A broader concept is not a prerequisite. If the target is something the source specializes, directly or further up, use `specializes`. That the broader concept comes first is already implied.
- A whole is not a prerequisite of its parts. If the source is a part or component of the target, do not link the target as `prereq`; describe the part-whole relation in prose.

### `specializes`

- A concept may have more than one broader concept. List the nearest ones.
- The first one listed is the primary broader concept. Tools use it to place the note in a tree and to lay out diagrams; the others are drawn as extra links and are just as true. Put first the broader concept under which a reader would most expect to find the note.
- Do not list an ancestor that is already reached through another broader concept you listed.
- No cycles: a concept cannot end up as a kind of itself.
- A part is not a kind. A wheel is part of a car, not a kind of car.

### `contrasts`

- The link is symmetric: if A contrasts B, then B contrasts A. Declare it on one note only; tools show it on both. If it is declared on both, tools treat the two declarations as one link.
- Negative test: if the two are not answering the same question, do not link them. This holds even when they are often confused, sit at different levels of generality, complement each other, or simply serve different purposes. Explain the difference in prose instead.
- Never link a concept to one of its own broader or narrower concepts along a `specializes` chain. A special case is not a rival to its general case; describe how they differ in prose.

## Every link has a reason

Each link carries one sentence saying why the relation holds, specific enough for a reader to check against the note. "Related concept" or "see also" is not a reason.

- Good: Square `specializes` Rhombus, "A square is a rhombus whose angles are all right angles."
- Not a reason: "Closely related shapes."

## Rules across types

1. No cycles in `prereq`, and none in `specializes`.
2. A note's broader concepts, direct or further up, are never its `prereq`.
3. If the source is a part of the target, the target is not its `prereq`.
4. `contrasts` never links two notes on the same `specializes` chain.
5. Link only to notes that exist in the collection. If the related concept has no note yet, keep the relation in prose and add the link once the note exists.

An editorial suggestion, not a rule: when one note collects many links of the same type, check whether it covers more than one concept.

## Procedure: proposing links from a note

Input: the text of one note, and the list of other notes in the collection (titles, plus their text if available).

1. Read the note. Collect the concepts it names or clearly depends on that exist as notes in the collection. Prefer relations the text states. A relation you infer must still rest on something the text says.
2. For each candidate target, ask these questions in order and stop at the first yes:
   1. Is the source a kind of the target? Use `specializes`.
   2. Is the source a part or component of the target? No link; record it as part-whole.
   3. Must the target be understood before the source can be? Use `prereq`. If any one of several targets would do, record an either-or prerequisite instead.
   4. Do source and target offer answers to the same question, by different reasoning? Run the negative test, then use `contrasts`.
   5. Otherwise, no link. Record which kind of relation it is.

   The order matters. Asking about kinds and parts first stops broader concepts and wholes from being recorded as prerequisites.
3. Write a one-sentence reason for each link.
4. Check the rules across types, against the links you propose and any links the collection already has.
5. Report in this shape:

```text
note: <title or id>
links:
  - type: <prereq | specializes | contrasts>
    target: <title or id>
    reason: <one sentence>
not linked:
  - target: <title or id, or the concept named in the text>
    kind: <part-whole | lineage | cause-effect | application | either-or-prereq | mutual-prereq | no-note | other>
    note: <one sentence>
conflicts: <the rule broken and the links involved, or "none">
```

List `specializes` links in priority order; the first is the primary broader concept. The "not linked" list matters: it records relations the vocabulary does not carry, so that nobody mistakes a missing link for a missing relation.

## Procedure: checking existing links

1. Collect every typed link in the collection.
2. Mirror each `contrasts` link so that both ends have it.
3. Check each rule across types. Also flag links without a reason, unknown identifiers, and targets with no note.
4. Report each problem with the links involved and the rule broken. Do not change links automatically. Which link is wrong depends on what the notes say, so the author decides.

## Storing links

Any format works if the identifiers stay exact and every link keeps its target and its reason. For notes with YAML front matter, one option is:

```yaml
specializes:
  - target: Rectangle
    reason: A square is a rectangle whose four sides are equal.
  - target: Rhombus
    reason: A square is a rhombus whose four angles are right angles.
prereq:
  - target: Right angle
    reason: The definition of a square refers to right angles.
```

## For tool builders

A tool computes these, so that authors do not have to:

- the transitive reduction of `prereq` for display, so that only direct prerequisites are drawn;
- the mirror of every `contrasts` link;
- reverse lists: what depends on a note, and what specializes it;
- a tree built from primary broader concepts, with other broader concepts drawn as extra links.

## Example

A small collection: Quadrilateral, Parallelogram, Rectangle, Rhombus, Square, Right angle, Pythagorean theorem, Measuring the diagonal of a room, Phlogiston theory, Oxygen theory of combustion.

| Source | Type | Target | Reason |
|---|---|---|---|
| Parallelogram | `specializes` | Quadrilateral | A parallelogram is a quadrilateral with two pairs of parallel sides. |
| Rectangle | `specializes` | Parallelogram | A rectangle is a parallelogram with four right angles. |
| Rhombus | `specializes` | Parallelogram | A rhombus is a parallelogram with four equal sides. |
| Square | `specializes` (primary) | Rectangle | A square is a rectangle whose sides are all equal. |
| Square | `specializes` | Rhombus | A square is a rhombus whose angles are all right angles. |
| Rectangle | `prereq` | Right angle | A rectangle is defined by its right angles. |
| Pythagorean theorem | `prereq` | Right angle | The theorem is a statement about triangles with a right angle. |
| Oxygen theory of combustion | `contrasts` | Phlogiston theory | Both explain what happens when something burns: one says the burning body takes up oxygen, the other that it gives off phlogiston. |

Not linked:

- Rectangle and Rhombus: both are kinds of parallelogram, but they are categories side by side, not rival answers to one question. No `contrasts`.
- Square and Parallelogram: already reached through Rectangle. No second `specializes`.
- Square and Quadrilateral as `prereq`: Quadrilateral is a broader concept of Square, so the relation is already carried by `specializes`.
- Pythagorean theorem and Measuring the diagonal of a room: the theorem gives the diagonal of a rectangular floor from its length and width. That is application, which this vocabulary leaves out, so it stays in the text of the note.
- Oxygen theory and Phlogiston theory, historically: the later theory displaced the earlier one. That history is lineage and stays in prose; the link records only that they are rival answers.

## Limits

- Tested once, by AI agents only; no human annotators yet. One AI coder, working from the maintainer's internal version of these rules, labelled 177 pairs of notes: 40 notes sampled from the maintainer's own concept library, each paired with notes it links to or mentions. Fresh agents that saw only this file, the text of each sampled note, and a short summary of each paired note labelled the same pairs. Agreement per type, against a bar of 0.70 set before the run: `prereq` 0.76, `specializes` 0.86, `contrasts` 0.80 (Claude Opus). A second run with Claude Sonnet, reported for reference and not used for the decision, gave 0.697 (just under the bar), 0.89 and 0.62. Application scored 0.69 (0.38 in the second run) and was left out. One rule and one step of the procedure were reworded after the run and not re-tested. Details are in `VALIDATION.md` in the skill's repository, not in this installed folder.
- The tests call for judgment. Careful readers can disagree; in the check above, agreement on `contrasts` differed most between the two runs.
- There is no inference engine. The rules are checks that an agent or a script runs.
- The identifiers are English; notes and reasons can be in any language.

## Anti-patterns

- Writing a broader concept, or the whole that a concept belongs to, as its prerequisite.
- Linking pairs that are merely easy to confuse as `contrasts`.
- Linking every concept a note mentions. A mention is not a relation.
- Turning a causal claim into a link.
- Reading a note with few links as unrelated to the rest.
- Adding local link types. If a relation does not fit, write it in prose.
