# Validation

What has been tested and what has not.

**Status:** 0.1.0 experimental prerelease, [release: date]. One agreement test so far (October 2026), run by AI agents only. It measures how often agents using this skill choose the same link type as a reference coder. It is not an accuracy figure, and no person has labelled anything.

**Version tested:** a four-type draft of this skill. Besides `prereq`, `specializes` and `contrasts`, it had an optional fourth type, `applies` (a theory or method used on a phenomenon, problem, or situation). The draft was changed after the test (§5), and the changes have not been re-tested.

The sampled notes, the reference labels and the agents' reports are not published: they come from the maintainer's private concept library.

## 1. What was measured

- **Unit:** a pair of notes (a source note and a candidate note) gets one label: `prereq`, `specializes`, `contrasts`, `applies`, or none. `prereq`, `specializes` and `applies` also have a direction.
- **Agreement per type:** positive specific agreement, 2a / (2a + b + c), where a counts pairs that the reference and the agent both gave this type in the same direction, b pairs only the reference gave it, and c pairs only the agent gave it. For 6 of the 177 pairs the reference recorded a second type that was equally valid; an agent choosing either counts as agreeing.
- **Decision rule, fixed before the run:** a type is kept if its agreement in the deciding run is at least 0.70. A type with fewer than 10 reference positives cannot be judged and is not kept. Confidence intervals are reported but play no part in the decision.
- **Also reported:** precision, recall, agreement ignoring direction, Cohen's kappa over the five labels, and 95% confidence intervals from 2,000 bootstrap resamples of source notes.

The bar of 0.70 and the sample of 40 notes were set before any labelling, and the design was written down before the agents ran.

## 2. Setup

**Sample**

- Pool: the maintainer's concept library, 976 notes across several disciplines. Excluded: 23 notes with no candidate notes; 62 whose text, once internal fields were stripped, still used this vocabulary's identifiers and would have given the answer away; 2 that mention the subjects of the skill's example. That left 889.
- Three groups, drawn with a fixed random seed: notes with a `specializes` link in the library (214, 10 drawn), notes without one but with an `applies` link (224, 20 drawn), and the rest (451, 10 drawn). 40 notes in all. The `applies` group was oversampled so that the fourth type would have enough positives to judge.
- Candidates for each source note: up to 8 notes it was already linked to by a typed link in either direction, including link types the library no longer uses, plus up to 2 notes its text links to. After removing duplicates across source notes: 177 pairs.
- Most notes are written in Chinese. The skill is in English, and the agents wrote their reasons in English.

**Design change before the run**

A first draw (two groups of 16 and 24 notes, up to 6 + 2 candidates) was given reference labels as a trial and had only 9 `applies` positives, below the minimum of 15 set at the time. The groups and candidate limits were re-chosen by simulating 50 other seeds; the minimum was lowered to 10, based on the precision a 40-note sample can reach; and the sample was drawn again with a new seed. All of this came before any agent labelled a pair, so no agreement figure was known. The bar of 0.70 and the 40 notes did not change. 56 pairs that also appeared in the trial draw kept their trial labels.

The lower minimum matters for one result: `contrasts` had 11 reference positives, which passes the minimum of 10 but would not have passed the earlier 15.

**Reference labels**

One AI coder, working from the maintainer's internal version of these rules, labelled all 177 pairs before the agents ran. Five conventions were written down first:

1. Indirect prerequisites and indirect broader concepts count as `prereq` and `specializes`.
2. A sub-field counts as `specializes`. A concept that a field studies, or that is a component of it, is none (part and whole).
3. Taking something for granted is not the same as needing it first. The question is whether the source can be explained without the target.
4. The target of `applies` must be a phenomenon, a class of problems, or a practical situation. Between two theories or methods, the label is none.
5. `contrasts` is only for rival answers to the same question. Categories side by side, complementary ideas, and concepts at different levels are none.

Distribution: `prereq` 34, `specializes` 20, `applies` 19, `contrasts` 11, none 93.

The reference coder saw more than the agents: the links already recorded on both notes, with their comments, and the full text of a note where needed.

**Agents**

- The 40 source notes were split into four batches of 10. Each batch went to a fresh agent that had the draft skill and a packet: the text of each source note, with front matter, title heading and internal workflow sections removed and internal links turned into plain text; and for each candidate, only its title, its one-line definition and the first sentence of its summary.
- The agents were told to use no tools beyond reading those two files, and had no web access. A check of their tool calls afterwards found that each read only its own two files, apart from one refused attempt to write a file.
- Deciding run: four agents on Claude Opus. Second run, reported for reference only: four agents on Claude Sonnet.
- Changes to the skill's procedure for the test: the candidates were fixed in advance; a link could be declared on either note of a pair; every candidate had to appear exactly once, under links or under not linked. A candidate an agent left out would have counted as none; none was left out.
- Reports came back as text and were copied verbatim. One agent tried to write its report to a file, was refused, and was asked to paste the report as it stood.
- Scoring was done by a script. After the reports arrived, one parsing error in the script was fixed (it split reports at a field name used inside items). The scoring rules did not change.

## 3. Results

| Type | Reference positives | Deciding run (Opus), 95% CI | Decision | Second run (Sonnet), 95% CI |
|---|---:|---|---|---|
| `prereq` | 34 | 0.76 (0.60–0.87) | kept | 0.697 (0.48–0.86) |
| `specializes` | 20 | 0.86 (0.55–0.97) | kept | 0.89 (0.67–0.98) |
| `contrasts` | 11 | 0.80 (0.55–0.97) | kept | 0.62 (0.29–0.80) |
| `applies` | 19 | 0.69 (0.44–0.89) | left out | 0.38 (0.11–0.72) |

Cohen's kappa over the five labels: 0.71 (Opus), 0.62 (Sonnet).

| Type | Opus precision | Opus recall | Sonnet precision | Sonnet recall |
|---|---:|---:|---:|---:|
| `prereq` | 0.70 | 0.82 | 0.72 | 0.68 |
| `specializes` | 1.00 | 0.75 | 1.00 | 0.80 |
| `contrasts` | 0.89 | 0.73 | 1.00 | 0.45 |
| `applies` | 0.85 | 0.58 | 0.71 | 0.26 |

- Three types reached the bar in the deciding run and are in this skill. `applies` fell short by 0.0125 and was left out, as the rule fixed before the run requires.
- In the second run only `specializes` reached the bar. `prereq` was just under it at 0.697, `contrasts` was at 0.62, and `applies` at 0.38. Had that run been the deciding one, only `specializes` would have been kept.
- The intervals are wide, because each type has only 11 to 34 reference positives. For `specializes` and `contrasts` the lower bound in the deciding run is 0.55. The point estimates do not show that agreement is above 0.70.
- The deciding run's most common error was an extra `prereq`: 12 pairs labelled `prereq` that the reference did not, 8 of them pairs the reference left unlinked. Errors on `specializes` and `contrasts` were mostly missed links rather than wrong types.
- Direction errors were rare: none in the deciding run, one in the second.

## 4. Limits of this test

1. **Recall is underestimated for links that belong on the candidate note.** The skill asks for every link to rest on something the text says, but the agents saw only a short summary of each candidate. Recall for links declared on the source note was 0.81 (25 of 31) in the deciding run and 0.74 (23 of 31) in the second; for links declared on the candidate note it was 0.69 (29 of 42) and 0.50 (21 of 42).
2. **One reference coder, an AI agent, not a person.** There was no second coder, so how far two careful coders would agree with each other is unknown. The reference coder also saw more than the agents did (§2).
3. **One model family.** The reference coder and both runs used Claude models.
4. **Reference errors found afterwards.** A check after the run, which does not change the decision, found three reference labels that the note text plainly contradicts: two pairs where the note says one concept must be understood first, and one pair where the note says the concept is used on a class of problems, labelled differently from a similar pair in the same sample. With those three corrected, the deciding run gives `applies` 0.73 and `prereq` 0.79; the second run gives `applies` 0.44 and `prereq` 0.74. The decision used the labels as they were recorded before the run, so `applies` stays out. Adding `applies` back would take a new test, set up in advance, for example with two reference coders and the full text of every candidate. No such test is scheduled.
5. **A small, single source.** 40 notes and 177 pairs from one library, written by one person, mostly in Chinese.
6. **Labels only.** The test measured the choice of one type per pair. It did not test the rules across types or the procedure for checking existing links.

## 5. Changes after the test (not re-tested)

The release candidate differs from the tested draft as follows:

- **`applies` removed.** Removed its row in the type table, its section, its rule ("`applies` is never mutual"), its step in the procedure, its value in the output format, its reverse list in "For tool builders", its mention in the description, and its anti-pattern. Added application to the relations the vocabulary leaves out, with one sentence on why; added `application` to the kinds under "not linked"; moved the Pythagorean theorem pair in the example from the link table to "Not linked".
- **Procedure, step 2.2,** was "Is one of them a part or component of the other?" and is now "Is the source a part or component of the target?". When the target is a part of the source, the part can still be its prerequisite.
- **Rules across types, rule 2,** was "Nothing on a note's `specializes` chain is also its `prereq`." and is now "A note's broader concepts, direct or further up, are never its `prereq`." The old wording could be read as also covering narrower concepts.
- **Limits** now report this test, and the line on where readers disagree names `contrasts` only.

The two rewordings have not been re-tested. Any later change to a test question or a type definition would need a new test.

## 6. Hosts

- All agents were started from Claude Code on macOS and given the skill as a file to read. The skill was not installed, so discovery by an agent's skill loader was not tested.
- Release test, October 2026: one desktop agent (Codex) on macOS 27.0.1, arm64. The skill folder was copied to `~/.agents/skills/concept-relations/`, and separately to `~/.codex/skills/concept-relations/`; from each path it appeared in a fresh agent's skill list. A fresh agent given the six links from the README "Try it" example, without the skill's name or path, loaded the installed skill and flagged links 3, 4 and 6 under rules 2, 3 and 4. The "Try it" prompt itself gave the same result. Neither run changed a file. One run of one synthetic example: this checks installation, discovery and the checking procedure on that example, not agreement.

## 7. Not yet tested

- The rewordings listed in §5.
- The rules across types and the procedure for checking existing links.
- People as annotators, and a second reference coder.
- Models outside the Claude family.
- Collections other than the maintainer's, and notes mainly in other languages.
- Agreement when agents see the full text of every candidate note.
- Installation and discovery on any agent host through the paths listed in `skills/concept-relations/README.md`.
