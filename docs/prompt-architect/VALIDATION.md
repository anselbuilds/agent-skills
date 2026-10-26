# Validation

What has been tested, what has not, and the checks used.

**Status:** 0.1.0 experimental prerelease, 2026-10-26. The revised candidate passed the applicable checks in the runs below; this is not a quality benchmark or a guarantee of downstream results.

## 1. Private predecessor, October 2026

The private version of this method was checked on five requests: four task types (review, summarize, generate, classify) and three vendors (Claude, OpenAI, Gemini). Each request went to a fresh sub-agent that read only the method, with no web access. All five results passed checks 1 to 5 below.

This does not carry over to this skill. The private version carried a hand-maintained table of vendor conventions; this skill replaces that table with reading the vendors' pages at run time (Step 5), which is the part most likely to fail and was not exercised. The runs were also all on one vendor's models (Claude), and the results were scored by the method's author, not blind.

## 2. Acceptance run of the first release candidate, October 2026

**Setup**

- Host: one desktop agent (Codex) on macOS, arm64. The skill folder was copied to the agent's personal skill folder (`~/.codex/skills/prompt-architect/`) and appeared in each new sub-agent's skill list.
- Requests R1 to R6 (§3). Each went to a fresh sub-agent with no earlier conversation, answers, or checks, given only "Use prompt-architect to handle this request:" and the request. Sub-agents could read public web pages. All six ran on one model at one effort setting; no other vendor's model was used, and no generated prompt was run on its target platform.
- The sub-agents also inherited the host's own instructions, which affected R5 (below).
- The coordinating agent scored the results against §4. This was one run per request, not blind.

**Results**

| Request | Result | Note |
|---|---|---|
| R1 (review, Claude) | fail | Check 6: the reason given for the assumed model cited a page that does not contain it; the page that does was read but not cited |
| R2 (summarize, Codex) | pass | |
| R3 (generate, Gemini) | pass | |
| R4 (classify, ChatGPT) | pass | The answer said the exact model could not be verified instead of naming one; the request note asked for a named default, which the pages read could not settle (see §3) |
| R5 (no platform) | fail | Check 8: it asked one question but added an explanation, partly required by the host's own rule for announcing a skill |
| R6 (no vendor guide) | pass | |

- All 26 links in the source list opened on the day. Four redirected. Two refused a plain HTTP client (403 and 308) but were read with another tool.
- Time per request: 13 to 90 seconds. Token counts were not available.

**Revisions after this run**: Step 5 now separates products from APIs and requires a cited reason for the assumed model or "model unknown"; the usage notes now cover the assumed model and the conventions used, each with a page; the Input section states that a missing-platform question is the whole answer; the Limits note how to tell a refused fetch from a missing page.

**Re-run after the revisions** (same host and procedure, one fresh sub-agent per request, same day): R1, R4 and R5 only.

| Request | Result | Note |
|---|---|---|
| R1 | pass | The assumed model now cites the vendor's models overview, which supports it |
| R4 | pass | States "model unknown" and uses only guidance that does not depend on the model |
| R5 | pass | The skill's answer was one question; the host's own notice that it was using a skill was recorded separately (check 8) |

At this stage, R2, R3 and R6 had not been re-run on this host and the link check had not been repeated. The later Codex follow-up below closes those gaps. No refused or missing page occurred in this earlier run.

**Run on a second host after the revisions** (October 2026)

- Host: Claude Code desktop app on macOS. The skill was not installed: each sub-agent was given the path to the skill folder, told to read `SKILL.md` and follow it, and told not to read any other file in the repository. Installation and discovery were therefore not exercised.
- Requests R2, R3 and R6 (§3), one fresh sub-agent each, given only the skill path and the request. All ran on one model (Claude Opus 5.5) at one effort setting. Sub-agents could read public web pages; the host's own rules blocked a plain HTTP client, so page status comes from the reading tool only.
- Missing-page check: a copy of the skill with one Anthropic link in the source list changed to an address that does not exist, run with request R1. This is a constructed case. It exercises the "page is gone" branch of the Limits text, not the "fetch refused" branch.
- The coordinating agent scored the results against §4. One run per request, not blind.

| Request | Result | Note |
|---|---|---|
| R2 (summarize, Codex) | pass | Named the assumed model and cited the Codex models page. The source list has no Codex pages; the sub-agent found them under `developers.openai.com/codex/`, which redirects to `learn.chatgpt.com` |
| R3 (generate, Gemini) | pass | Stated "model unknown" because no page read names the Gemini app's default; a source-list page marked deprecated was read and not used |
| R6 (no vendor guide) | pass | Opened no vendor pages; generic structure, answers must cite the user's documents, usage notes say no platform guidance was checked |
| R1 with an edited link | pass | The edited link returned 404. The answer named it, used the vendor's current prompting page instead, and said so in the usage notes |

- 17 of the 26 source-list links were opened by these runs and all 17 opened. One of them, the Gemini 3 developer guide, is marked deprecated on the page. The other 9 were not opened, so check 9 was not run.
- Time per request: 83 to 344 seconds. Sub-agent token totals as reported by the host: about 101,000 to 188,000.

**Codex follow-up, 2026-10-24**

- Host: Codex desktop on macOS 27.0.1, arm64. Three installed files matched the revised candidate byte-for-byte at `~/.codex/skills/prompt-architect/`.
- Four fresh sub-agents had no earlier conversation, answer keys or other runs' outputs. Each saw the skill in its initial list and read its installed instructions and source list. They still inherited host instructions. All used GPT-6 Astra at high effort; the coordinator scored the outputs, not blind.
- R2, R3 and R6 passed every applicable check. R6 had no vendor guidance, so vendor-specific checks were not applicable; its tool record showed no web call.
- A fourth run used a naturally refused page: the OpenAI model-release-notes URL returned HTTP 403 to the first plain HTTP fetch, then the agent read the same page with a web reader. It distinguished a refused fetch from a missing page, changed tools and recorded the URL it read. This was not a fabricated error or an edited link.
- All 28 source-list URLs were checked: 27 returned HTTP 200 after redirects; one returned 403 to the HTTP client and was readable with the other tool. The full-list check was performed by the coordinator; it does not mean every sub-agent read all 28 pages.
- One non-blocking wording observation remains: an API model's documented effort default is not evidence of the setting currently selected in the Codex interface. Any example using that output must identify the API scope or keep the product setting unspecified.

**Release packaging, 2026-10-26**

All 28 source-list URLs were rechecked for this release: 27 returned HTTP 200 with matching page content; the OpenAI model-release-notes page returned HTTP 403 to the plain HTTP client and was readable with a web reader. This verifies reachability, not every claim on those pages.

The instruction body is unchanged from the revised candidate used in the follow-up. Changes finish release metadata, reconcile this record, add a bilingual first-use tutorial and a skill-folder MIT license, and make documentation links work from an installed copy. A strict YAML check also found an unquoted colon in the description; the scalar is now quoted, with the decoded description and instruction body unchanged. No new agent-behavior run is claimed for these packaging changes. The tutorial's fixture and expected results are synthetic teaching material, not a measured target-platform result.

## 3. Practice requests

| ID | Request | What it exercises |
|---|---|---|
| R1 | Write a prompt for a contract review assistant that flags risky clauses, to run in Claude. | Review task; Anthropic pages |
| R2 | Write a prompt for a role that summarizes the key points of a book, to run in Codex. | Summarize task; OpenAI pages; coding-agent register |
| R3 | Write a prompt for a short-story writing assistant, to run in Gemini. | Generate task; Google pages; preview or legacy status if the pages say so |
| R4 | Write a prompt that classifies customer support tickets and routes them to one of five teams, to run in ChatGPT. | Classify task; product name without a model, so the answer states the model it assumed with a supporting page, or says the model is unknown |
| R5 | Write a prompt that turns meeting transcripts into action lists. | No platform given: one clarifying question, nothing else |
| R6 | Write a prompt for answering questions from uploaded policy documents, to run in a document chat tool with no published prompting guide. | No official guidance: generic structure, citations to the user's documents, stated as not checked against vendor guidance |

## 4. Checks

A result passes only if every applicable check holds.

1. The prompt contains real reasoning steps for the task type, not just a heading.
2. The prompt contains success criteria someone could check.
3. The prompt defines output fields and their order.
4. No emoji or decorative symbols are used as structure, unless the purpose is casual.
5. The prompt is self-contained: no source numbers, no references to the skill, no features the platform lacks.
6. Every platform-specific setting or convention in the prompt or the usage notes is traceable to a vendor page that was read in this run, cited with URL and date. Nothing vendor-specific appears without a cited page.
7. Where a page read in this run says to remove or avoid an instruction for this model, the prompt does not contain it.
8. When the platform is missing, the skill's answer is one clarifying question and nothing else. A notice that the host itself requires when a skill is used is recorded separately; it is not counted as part of the answer, but anything beyond that notice is.
9. Every link in `skills/prompt-architect/references/official-sources.md` opens (after redirects) on the day of the run; failures are listed.

## 5. Not yet tested

- Host-native rendering of documentation links across all agents. This release uses fixed-version GitHub links from the installed README instead of assuming the repository docs were copied with the skill.
- Installation and discovery on hosts other than Codex on macOS (Claude Code was run with the skill path given, not installed), and Gemini as a host.
- Generated prompts run on their target platforms, and the quality of their results on real contracts, books, tickets, or documents.
- Working without web access, and a broken link with no reachable replacement.
- Vendor pages that contradict each other, or page content written to mislead the agent.
- Repeated runs of the same request.
