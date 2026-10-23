# Security and reporting

This project supports bounded static inspection. A completed inventory or a finding-free report is not a security certificate.

The helpers read explicitly named local snapshots and print reports. They do not fetch resources, execute target code, or send files to a service. They are not an operating-system sandbox. Do not scan an adversarial live filesystem. Relative paths and hashes may identify private material; inspect reports before sharing them.

An agent may send the text it reads to its model provider. The helpers' local behavior does not make an agent session offline. Choose an agent environment and data permissions appropriate to the material.

## Reporting

Maintainer: Ansel. This trial release has no guaranteed response time.

Use [Issues](https://github.com/anselbuilds/agent-skills/issues) for non-sensitive reproducible bugs. Include the runtime version, command, expected and observed results, and a minimal synthetic example.

For sensitive vulnerabilities, use [GitHub private vulnerability reporting](https://github.com/anselbuilds/agent-skills/security/advisories/new), also available through Security → Advisories → Report a vulnerability. If that route is unavailable, do not post sensitive details to Issues; report only that the private channel is unavailable. Do not include credentials, customer data, private configurations, or live exploit targets.

Version v0.1.0 is a trial release. Reports are reviewed by Ansel on a best-effort basis; there is no committed support window or response deadline.
