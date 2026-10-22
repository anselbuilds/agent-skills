# Static inventory helper

The helper imports only Node.js built-ins. Its input is a stable, explicitly authorized local directory. Output is one JSON document using `github-agent-resource-static-scan-v1`.

## Coverage

It inventories relative file names, byte sizes, SHA-256 hashes, selected manifests and execution surfaces. Findings include suspicious Unicode, HTML comments, path reference classifications, selected npm lifecycle hooks, symlinks, and binary/archive indicators. Findings are review signals; ordinary language and emoji may legitimately contain some flagged characters.

It does not understand all languages, prove script behavior, detect every secret, inspect nested archives, resolve dependencies or advisories, validate publisher identity, or establish runtime behavior. Markdown parsing is heuristic. URLs in prose are not a complete map of network effects.

`.git`, `node_modules`, `.venv`, and `__pycache__` are excluded and reported. Symlink targets are not intentionally traversed. Inventory fingerprints cover included files and link metadata only, not dependencies in excluded directories or symlink target contents. A `complete` scan is not a complete repository audit.

The tool checks some size/time changes during file reads. It is **not race-proof**, does not enforce filesystem sandboxing, and does not establish that an ancestor of the input path is not a link. The caller must supply an inert snapshot in an appropriate environment; do not scan an adversarial live filesystem.

## Limits and output

Defaults: 500 files, 32 MiB total read, 16 MiB per hashed file, 2 MiB per text scan, 1,000 findings. CLI and programmatic overrides share hard ceilings. A cap or read error is a coverage gap. Partial scans suppress the resource-set fingerprint.

Reaching the findings cap stops further collection and file traversal. The scan conservatively reports `partial` and `findingsTruncated`, including when the cap might exactly equal all available findings. Markdown references are collected incrementally rather than materialized in full. Current-file reading, hashing, Unicode analysis and regex search still require work within the byte limits; this is not a wall-clock or memory sandbox. An unreadable symlink is a coverage gap even when other files can still be scanned.

Unicode byte offsets refer to the original UTF-8 bytes, including a leading BOM. Only a BOM at the start is exempt from format-character findings. Line and column positions count the preserved text, including that leading character.

- Exit 0: included inventory completed, findings may exist.
- Exit 1: partial inventory or scan failure.
- Exit 2: invalid input.

No absolute root path or source text snippets are emitted. Relative names, sizes, hashes, and findings can still identify private material; review output before sharing it. Hashes are not anonymization.

The scanner's file-count bound differs from the skill's starting budget of 40 reviewed text files. A broad inventory does not authorize reading or interpreting every file. Record these two coverage scopes separately.
