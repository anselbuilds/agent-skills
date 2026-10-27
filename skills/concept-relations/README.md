# Concept Relations

An agent skill for typed links between concept notes: `prereq`, `specializes` and `contrasts`, each with a test question, and every link with a one-sentence reason.

It works in two directions. It proposes links from the text of a note, and it checks links a collection already has against a few rules, so that a reader can tell what a link means and a tool can draw or check the result. The vocabulary is deliberately small: it names the relations it leaves out, and a missing link never means two concepts are unrelated.

> Version 0.1.0, experimental prerelease · Vocabulary v0.1 · Maintainer: Ansel · License: MIT

## What you get

- A [skill](SKILL.md) with three link types and their test questions, rules across types, a procedure for proposing links from a note, a procedure for checking existing links, a storage format, a list of what a tool should compute, a worked example, and its limits.
- The record of the one test so far in [VALIDATION.md](../../docs/concept-relations/VALIDATION.md).

## What it does not do

- It does not carry part and whole, intellectual lineage, cause and effect, application, either-or prerequisites, or mutual prerequisites. These stay in the text of the note.
- It does not model causes, mechanisms or arguments, and it is not a formal ontology. There is no inference engine; the rules are checks.
- It does not change links on its own. The checking procedure reports problems; the author decides which link is wrong.
- It has no code. Drawing, transitive reduction of prerequisites and mirroring of `contrasts` are left to a tool; the skill lists what that tool should compute.

## Requirements

- An agent that can load skills in the `SKILL.md` format and read the skill folder.
- Your notes as text the agent can read. To propose links, give it the text of the other notes as well as their titles where you can. In the test, agents saw only a short summary of each other note, and they missed more of the links that belong on that other note.
- No web access is needed.

## Try it without installing

1. Download the repository and keep `skills/concept-relations/` intact.
2. Open the repository folder in an agent that can read files.
3. Use this prompt:

> Read `skills/concept-relations/SKILL.md` and follow "Procedure: checking existing links" on this collection. The notes are: Animal, Mammal, Dog, Heart, Circulatory system, Natural selection, Lamarckian inheritance. The links are:
>
> 1. Mammal `specializes` Animal: "A mammal is an animal that feeds its young on milk."
> 2. Dog `specializes` Mammal: "A dog is a mammal: it has hair and feeds its young on milk."
> 3. Dog `prereq` Animal: "A reader has to know what an animal is first."
> 4. Heart `prereq` Circulatory system: "The heart only makes sense as the pump of the circulatory system."
> 5. Natural selection `contrasts` Lamarckian inheritance: "Both explain how living things come to suit their surroundings: one by inherited variants surviving and reproducing, the other by traits acquired during life being passed on."
> 6. Dog `contrasts` Mammal: "Different levels of classification."
>
> Report each problem with the rule broken and the links involved. Do not change anything.

A correct check flags links 3, 4 and 6 and changes nothing:

- Link 3 breaks rule 2: Animal is a broader concept of Dog, through Mammal, so it is not a prerequisite.
- Link 4 breaks rule 3: the heart is a part of the circulatory system, so the whole is not its prerequisite.
- Link 6 breaks rule 4: Dog and Mammal are on the same `specializes` chain. Its reason also fails the negative test, since the two do not answer the same question.

Links 1, 2 and 5 hold.

## Install

Copy the whole `skills/concept-relations/` folder to the skill location your agent uses. The result must end in `concept-relations/SKILL.md`, without a doubled folder. The test record stays in `docs/concept-relations/` and is not part of the installed folder.

| Agent | Project folder | Personal folder |
|---|---|---|
| Claude Code | `.claude/skills/concept-relations/` | `~/.claude/skills/concept-relations/` |
| Codex | `.agents/skills/concept-relations/` | `~/.agents/skills/concept-relations/` |
| GitHub Copilot | `.github/skills/concept-relations/` | `~/.copilot/skills/concept-relations/` |

These are the hosts' documented defaults at the time of writing; check your agent's current documentation. If the destination already exists, compare versions before replacing it. Restart or refresh the agent if the skill does not appear.

Tested on: Codex on macOS, installed at `~/.agents/skills/concept-relations/` and, in a separate run, at `~/.codex/skills/concept-relations/`; a fresh agent found it at both and used it for the check above without being told its name. Claude Code was tested by giving the skill as a file to read, not by installing it. Other paths in the table have not been tested.

## First real use

> Use concept-relations to propose links for this note: <paste the note>. The other notes in the collection are: <titles, with their text if you can>. Report the links, the not-linked list and any conflicts.

> Use concept-relations to check the typed links in <folder or file>. Report each problem with the rule broken and the links involved. Do not change any link.

## How well does it work?

One agreement test so far, run by AI agents only, with no human annotators:

- One AI coder, working from the maintainer's internal version of these rules, labelled 177 pairs of notes drawn from 40 notes in the maintainer's concept library. Fresh agents that had only this skill labelled the same pairs.
- In the deciding run (Claude Opus), against a bar of 0.70 set before the run, agreement was 0.76 for `prereq`, 0.86 for `specializes` and 0.80 for `contrasts`. A fourth type, application, scored 0.69 and was left out.
- A second run with Claude Sonnet, for reference only, gave `prereq` 0.697 (just under the bar), `specializes` 0.89 and `contrasts` 0.62.
- One reference coder, one model family, and wide confidence intervals. One rule and one step of the procedure were reworded after the test and have not been re-tested.

See [VALIDATION.md](../../docs/concept-relations/VALIDATION.md) for the setup, the intervals and the limits. This is not an accuracy figure.

## Origin

This vocabulary is a lagging public snapshot of the one the maintainer uses in their own concept library. The internal version is the reference and changes on its own schedule; this public version follows on its own release schedule, and every change is listed in the [changelog](../../CHANGELOG.md).

`VALIDATION.md` lives in the repository under `docs/concept-relations/`, not in this folder, so its links work on GitHub but not in an installed copy.
