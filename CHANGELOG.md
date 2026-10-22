# Changelog

Each skill has its own versions and tags (`{skill}-v{version}`).

## red-team-gate

### 0.1.0, tag `red-team-gate-v0.1.0`, [release: date]

First public release, experimental. Tested on Codex on macOS; see `docs/red-team-gate/VALIDATION.md` for what was and was not tested.

## inspect-github-agent-resources

### 0.1.0, tag `inspect-github-agent-resources-v0.1.0`, [release: date]

Moved from anselbuilds/inspect-github-agent-resources, release v0.1.0 (commit 2d43edf0). The content is the same as that release. 

No file content was changed.

Root README relocation is pending because the destination already contains the original skill README. The original skill README is preserved.


Relocated files:
- `.github/ISSUE_TEMPLATE/bug_report.yml` -> `docs/inspect-github-agent-resources/.github/ISSUE_TEMPLATE/bug_report.yml`.
- `.gitignore` -> `docs/inspect-github-agent-resources/.gitignore`.
- `CHANGELOG.md` -> `docs/inspect-github-agent-resources/CHANGELOG.md`.
- `SECURITY.md` -> `docs/inspect-github-agent-resources/SECURITY.md`.
- `VALIDATION.md` -> `docs/inspect-github-agent-resources/VALIDATION.md`.

## price-watch

### 0.1.0, tag `price-watch-v0.1.0`, [release: date]

Moved from anselbuilds/safari-price-watch, release v0.1.0 (commit 408477fe). The installable name `price-watch` is unchanged. The content is the same as that release. 

- `docs/price-watch/README.zh-Hant.md`: `](README.md)` → `](https://github.com/anselbuilds/safari-price-watch/blob/408477fed8ee2b00af4759da69b4c7b90b00d2d2/README.md)`.
- `docs/price-watch/README.zh-Hant.md`: `](LICENSE)` → `](../../LICENSE)`.
- `docs/price-watch/README.zh-Hant.md`: `](skills/price-watch/references/registry.md)` → `](../../skills/price-watch/references/registry.md)`.
- `tests/price-watch/test_watchlist.py`: `Path(__file__).resolve().parents[1]` → `Path(__file__).resolve().parents[2]`.
- `docs/price-watch/VALIDATION.md`: `discover -s tests -v` → `discover -s tests/price-watch -v`.
- `docs/price-watch/README.zh-Hant.md`: `discover -s tests -v` → `discover -s tests/price-watch -v`.

Root README relocation is pending because the destination already contains the original skill README. The original skill README is preserved.


Relocated files:
- `.github/ISSUE_TEMPLATE/bug_report.yml` -> `docs/price-watch/.github/ISSUE_TEMPLATE/bug_report.yml`.
- `.gitignore` -> `docs/price-watch/.gitignore`.
- `CHANGELOG.md` -> `docs/price-watch/CHANGELOG.md`.
- `README.zh-Hant.md` -> `docs/price-watch/README.zh-Hant.md`.
- `SECURITY.md` -> `docs/price-watch/SECURITY.md`.
- `VALIDATION.md` -> `docs/price-watch/VALIDATION.md`.
- `tests/test_watchlist.py` -> `tests/price-watch/test_watchlist.py`.
