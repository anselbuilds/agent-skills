# Changelog

Each skill has its own versions and tags (`{skill}-v{version}`).

## prompt-architect

### 0.1.0, tag `prompt-architect-v0.1.0`, 2026-10-26

First public release, experimental, by Ansel under MIT. Includes the task-method workflow, first-party vendor source list, installation instructions, and a bilingual [first-use tutorial](docs/prompt-architect/FIRST-USE.md).

Codex installation and discovery, revised practice cases and a naturally refused-fetch fallback were checked on macOS; see [VALIDATION.md](docs/prompt-architect/VALIDATION.md). The instruction body is unchanged from that tested candidate; the identical description is now quoted so strict YAML parsers accept the frontmatter. Generated prompts have not been evaluated on their target platforms with real inputs. A separate Trigpoint method article is not part of this release.

## concept-relations

### 0.1.0, tag `concept-relations-v0.1.0`, 2026-10-28

First public release, experimental. Vocabulary v0.1. See `docs/concept-relations/VALIDATION.md` for what was and was not tested.

## red-team-gate

### 0.1.0, tag `red-team-gate-v0.1.0`, 2026-10-24

First public release, experimental. Tested on Codex on macOS; see `docs/red-team-gate/VALIDATION.md` for what was and was not tested.

## inspect-github-agent-resources

### Unreleased

Standardized the display name and documentation titles as **GitHub Agent Resource Review**. Author and maintainer attribution remains Ansel. The `inspect-github-agent-resources` identifier, folder path, invocation and behavior are unchanged.

### 0.1.0, tag `inspect-github-agent-resources-v0.1.0`, 2026-10-24

Moved from anselbuilds/inspect-github-agent-resources, release v0.1.0 (commit 2d43edf0). The content is the same as that release, except that the links for reporting issues and security problems now point to this repository, because the old repository is archived.

Relocated files:
- `.github/ISSUE_TEMPLATE/bug_report.yml` -> `docs/inspect-github-agent-resources/.github/ISSUE_TEMPLATE/bug_report.yml`.
- `.gitignore` -> `docs/inspect-github-agent-resources/.gitignore`.
- `CHANGELOG.md` -> `docs/inspect-github-agent-resources/CHANGELOG.md`.
- `SECURITY.md` -> `docs/inspect-github-agent-resources/SECURITY.md`.
- `VALIDATION.md` -> `docs/inspect-github-agent-resources/VALIDATION.md`.
- `README.md` -> `docs/inspect-github-agent-resources/README.md`.

The original `skills/inspect-github-agent-resources/README.md` is retained byte-for-byte. Only relocation paths/relative links and the explicitly listed reporting URLs differ.

Content/path changes:
- `docs/inspect-github-agent-resources/README.md`: `](LICENSE)` -> `](../../LICENSE)` (2 occurrence(s)).
- `docs/inspect-github-agent-resources/README.md`: `](skills/inspect-github-agent-resources/SKILL.md)` -> `](../../skills/inspect-github-agent-resources/SKILL.md)` (1 occurrence(s)).
- `docs/inspect-github-agent-resources/README.md`: `](skills/inspect-github-agent-resources/examples/review-example.md)` -> `](../../skills/inspect-github-agent-resources/examples/review-example.md)` (2 occurrence(s)).
- `docs/inspect-github-agent-resources/README.md`: `](skills/inspect-github-agent-resources/references/scanner.md)` -> `](../../skills/inspect-github-agent-resources/references/scanner.md)` (1 occurrence(s)).
- `docs/inspect-github-agent-resources/README.md`: `](skills/inspect-github-agent-resources/README.md)` -> `](../../skills/inspect-github-agent-resources/README.md)` (1 occurrence(s)).
- `docs/inspect-github-agent-resources/SECURITY.md`: `https://github.com/anselbuilds/inspect-github-agent-resources/issues` -> `https://github.com/anselbuilds/agent-skills/issues` (1 occurrence(s)).
- `docs/inspect-github-agent-resources/SECURITY.md`: `https://github.com/anselbuilds/inspect-github-agent-resources/security/advisories/new` -> `https://github.com/anselbuilds/agent-skills/security/advisories/new` (1 occurrence(s)).
- `skills/inspect-github-agent-resources/SECURITY.md`: `https://github.com/anselbuilds/inspect-github-agent-resources/issues` -> `https://github.com/anselbuilds/agent-skills/issues` (1 occurrence(s)).
- `skills/inspect-github-agent-resources/SECURITY.md`: `https://github.com/anselbuilds/inspect-github-agent-resources/security/advisories/new` -> `https://github.com/anselbuilds/agent-skills/security/advisories/new` (1 occurrence(s)).

## price-watch

### 0.1.0, tag `price-watch-v0.1.0`, 2026-10-24

Moved from anselbuilds/safari-price-watch, release v0.1.0 (commit 408477fe). The installable name `price-watch` is unchanged. The content is the same as that release, except that the links for reporting issues and security problems now point to this repository, because the old repository is archived.

Relocated files:
- `.github/ISSUE_TEMPLATE/bug_report.yml` -> `docs/price-watch/.github/ISSUE_TEMPLATE/bug_report.yml`.
- `.gitignore` -> `docs/price-watch/.gitignore`.
- `CHANGELOG.md` -> `docs/price-watch/CHANGELOG.md`.
- `README.zh-Hant.md` -> `docs/price-watch/README.zh-Hant.md`.
- `SECURITY.md` -> `docs/price-watch/SECURITY.md`.
- `VALIDATION.md` -> `docs/price-watch/VALIDATION.md`.
- `tests/test_watchlist.py` -> `tests/price-watch/test_watchlist.py`.
- `README.md` -> `docs/price-watch/README.md`.

The original `skills/price-watch/README.md` is retained, with only its two explicitly authorized reporting URLs changed; all other bytes match the original. Only relocation paths/relative links and the explicitly listed reporting URLs differ.

Content/path changes:
- `docs/price-watch/README.zh-Hant.md`: `](README.md)` -> `](https://github.com/anselbuilds/safari-price-watch/blob/408477fed8ee2b00af4759da69b4c7b90b00d2d2/README.md)` (1 occurrence(s)).
- `docs/price-watch/README.zh-Hant.md`: `](LICENSE)` -> `](../../LICENSE)` (1 occurrence(s)).
- `docs/price-watch/README.zh-Hant.md`: `](skills/price-watch/references/registry.md)` -> `](../../skills/price-watch/references/registry.md)` (1 occurrence(s)).
- `tests/price-watch/test_watchlist.py`: `Path(__file__).resolve().parents[1]` -> `Path(__file__).resolve().parents[2]` (1 occurrence(s)).
- `docs/price-watch/VALIDATION.md`: `discover -s tests -v` -> `discover -s tests/price-watch -v` (1 occurrence(s)).
- `docs/price-watch/README.zh-Hant.md`: `discover -s tests -v` -> `discover -s tests/price-watch -v` (1 occurrence(s)).
- `docs/price-watch/README.md`: `](LICENSE)` -> `](../../LICENSE)` (1 occurrence(s)).
- `docs/price-watch/README.md`: `](skills/price-watch/references/registry.md)` -> `](../../skills/price-watch/references/registry.md)` (1 occurrence(s)).
- `docs/price-watch/README.md`: `](skills/price-watch/README.md)` -> `](../../skills/price-watch/README.md)` (1 occurrence(s)).
- `docs/price-watch/README.md`: `discover -s tests -v` -> `discover -s tests/price-watch -v` (1 occurrence(s)).
- `docs/price-watch/SECURITY.md`: `https://github.com/anselbuilds/safari-price-watch/issues` -> `https://github.com/anselbuilds/agent-skills/issues` (1 occurrence(s)).
- `docs/price-watch/SECURITY.md`: `https://github.com/anselbuilds/safari-price-watch/security/advisories/new` -> `https://github.com/anselbuilds/agent-skills/security/advisories/new` (1 occurrence(s)).
- `skills/price-watch/README.md`: `https://github.com/anselbuilds/safari-price-watch/issues` -> `https://github.com/anselbuilds/agent-skills/issues` (1 occurrence(s)).
- `skills/price-watch/README.md`: `https://github.com/anselbuilds/safari-price-watch/security/advisories/new` -> `https://github.com/anselbuilds/agent-skills/security/advisories/new` (1 occurrence(s)).
