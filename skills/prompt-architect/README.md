# Prompt Architect

An agent skill that writes a ready-to-paste prompt for a stated purpose on a stated AI platform.

It works in two layers. First it builds the task method: what kind of task this is, the steps the model should reason through, success criteria someone could check, and the fields of the answer. Then it reads the platform vendor's current official prompting documentation and writes the method in that platform's conventions. The usage notes cite the pages it read.

> Version: 0.1.0 · Status: experimental prerelease · Maintainer: Ansel · License: [MIT](LICENSE)
> [First-use tutorial / 最短教學](https://github.com/anselbuilds/agent-skills/blob/prompt-architect-v0.1.0/docs/prompt-architect/FIRST-USE.md) · A separate Trigpoint method article has not been published for this release.

## Why it reads the vendor's pages every time

Prompting advice goes out of date with each model release. A tip that helped one model can be unnecessary or harmful for the next, and vendors now publish model-specific guidance that sometimes says to remove instructions written for older models. So this skill ships no fixed per-vendor rules. It ships a list of where each vendor publishes its guidance ([references/official-sources.md](references/official-sources.md)) and asks your agent to read the current pages.

## What it does not do

- It does not contain a library of ready-made prompts.
- It does not summarize vendor documentation for you in advance. Your agent reads the original pages.
- It does not test the prompt it writes. Try the prompt on the target platform with real inputs before relying on it.

## Requirements

- An agent that can load skills in the `SKILL.md` format and read the skill folder.
- Web access, so the agent can read the vendor pages. Without it, the skill asks you to paste the relevant guidance or writes a generic prompt and says that no platform guidance was checked.

## Install

Start from the [v0.1.0 release](https://github.com/anselbuilds/agent-skills/releases/tag/prompt-architect-v0.1.0). The attached skill ZIP contains a `prompt-architect/` folder; the repository source archive contains `skills/prompt-architect/`. Copy that whole folder to the skill location your agent uses. The result must end in `prompt-architect/SKILL.md`, without a doubled folder.

| Agent | Project folder | Personal folder |
|---|---|---|
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/prompt-architect/` | `~/.claude/skills/prompt-architect/` |
| Codex | `.agents/skills/prompt-architect/` | `~/.agents/skills/prompt-architect/` |
| [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills) | `.github/skills/prompt-architect/` | `~/.copilot/skills/prompt-architect/` |

The table lists host conventions, not a claim that every path was tested. The Codex paths follow [OpenAI's Build skills documentation](https://learn.chatgpt.com/docs/build-skills), checked 2026-10-26. Verify the destination in your host before copying; if it already exists, compare versions rather than overwriting it. If the skill does not appear, refresh or restart the host.

Tested on: Codex desktop on macOS arm64, installed at `~/.codex/skills/prompt-architect/`; fresh sub-agents discovered and used it. That observed installation differs from the currently documented Codex paths above. Claude Code was tested by giving the skill path directly, not by installing it. Other host installation paths remain untested.

## Use

> Use prompt-architect: write a prompt for reviewing supplier contracts for risky clauses, to run in Claude.

> Use prompt-architect: I need custom instructions for ChatGPT that turn meeting transcripts into action lists for my team.

The answer has three parts: a one-line summary, the prompt itself (paste only this part), and usage notes with the model it assumed, the vendor conventions and settings it used, and the vendor pages each came from.

## How well does it work?

See [VALIDATION.md](https://github.com/anselbuilds/agent-skills/blob/prompt-architect-v0.1.0/docs/prompt-architect/VALIDATION.md) for what has been tested and what has not.

## Sources

Where the method comes from and how the vendor list is maintained: [SOURCES.md](https://github.com/anselbuilds/agent-skills/blob/prompt-architect-v0.1.0/docs/prompt-architect/SOURCES.md).

The tutorial and evidence documents live under `docs/prompt-architect/` in the repository. The links above point to this release on GitHub, so they also work from an installed copy with web access. Only the skill folder is installed.

Maintained by Ansel, with no promised response time. Use [Issues](https://github.com/anselbuilds/agent-skills/issues) for questions and reproducible problems; use [private vulnerability reporting](https://github.com/anselbuilds/agent-skills/security/advisories/new) for sensitive security reports.
