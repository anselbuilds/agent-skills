# Agent skills

Agent skills by Ansel. Each folder under `skills/` installs on its own.

| Skill | What it does | Version | Status | Verified on |
|---|---|---|---|---|
| [red-team-gate](skills/red-team-gate/) | Puts one claim through an independent attempt to refute it before you rely on it. | 0.1.0 | experimental prerelease | Codex on macOS |
| [inspect-github-agent-resources](skills/inspect-github-agent-resources/) | Reviews skills, plugins, MCP servers and agent templates for task fit, security risks and version changes. | 0.1.0 | trial release (prerelease) | macOS arm64 helper tests; host-native discovery untested |
| [price-watch](skills/price-watch/) | Keeps a local price-watch registry, setup cards and verified state for Safari Notify Me. No scraper, scheduler or notification backend. [First-use tutorial](docs/price-watch/FIRST-USE.md). | 0.1.0 | experimental prerelease | macOS arm64 CLI tests; host-native discovery untested |
| [prompt-architect](skills/prompt-architect/) | Builds a task method, reads current vendor guidance, and writes a ready-to-paste prompt. [First-use tutorial](docs/prompt-architect/FIRST-USE.md). | 0.1.0 | experimental prerelease | Codex on macOS; Claude Code by explicit file path only |

"Verified on" states the tested scope for each skill. Helper or CLI tests do not establish host-native installation or discovery. See each skill's validation record under `docs/`.

## Install

Copy one folder from `skills/` to the skill location your agent uses, so that the result ends in `{skill-name}/SKILL.md` without a doubled folder. Each skill's README lists the usual locations for Claude Code, Codex and GitHub Copilot.

## Layout

| Folder | Contents | Installed? |
|---|---|---|
| `skills/{name}/` | The skill and its README | Yes, copy this folder |
| `docs/{name}/` | References, test records, answer keys, article snapshots | No |
| `tests/{name}/` | Repository tests for a skill, where it has them | No |

## Versions

Each skill has its own versions. Tags have the form `{skill}-v{version}`, for example `red-team-gate-v0.1.0`. Changes are listed in [CHANGELOG.md](CHANGELOG.md).

## License

| Files | License | Rights holder |
|---|---|---|
| All files except article snapshots | MIT, see [LICENSE](LICENSE) | Ansel |
| Article snapshots, `docs/*/method.md` | CC BY 4.0, see [LICENSE-CONTENT](LICENSE-CONTENT) | Ansel |

## Maintenance

Maintained by Ansel. Issues are open for bug reports and questions. There is no promised response time. To report a security problem privately, see [SECURITY.md](SECURITY.md).

## Earlier repositories

`inspect-github-agent-resources` and `price-watch` were first published as separate repositories, anselbuilds/inspect-github-agent-resources and anselbuilds/safari-price-watch. Both repositories are archived. Their existing history, tags and v0.1.0 releases remain there.
