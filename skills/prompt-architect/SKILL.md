---
name: prompt-architect
description: "Writes a ready-to-paste prompt for a stated purpose on a stated AI platform. First builds the task method (task type, reasoning steps, measurable success criteria, output fields), then reads the platform vendor's current official prompting documentation and expresses the method in that platform's conventions, citing the pages it used. Use when asked to write, design, or rewrite a prompt, system prompt, or custom instructions for ChatGPT, Claude, Codex, Gemini, or another assistant. Not a prompt library: it does not ship fixed per-vendor rules, it reads the vendor's pages each time."
---

# Prompt Architect

Turn "I need a prompt that does X on platform Y" into a complete prompt you can paste into Y.

Most hand-written prompts fail in one of two ways. Either they describe a role and a task but leave out how the task should actually be done, so the model improvises; or they follow conventions written for an older model, which the current model no longer needs or even handles worse. This skill fixes the first with an explicit task method, and the second by reading the vendor's current documentation every time instead of relying on a fixed list of tips.

## Input

The request has two parts:

- **Purpose**: what the prompt should achieve, for example "review supplier contracts for risky clauses" or "summarize long research papers for a product team".
- **Platform**: where the prompt will run, for example ChatGPT, Claude, Codex, Gemini, or a named model.

If the platform is missing, ask one question for it before doing anything else. If the purpose is missing or too vague to classify, ask one question for it. Do not guess either.

When you ask, the question is your whole answer: do not return the three-part Output below, and add no explanation of your own. The Output applies only once the request is complete. (If the host you run in requires its own notice when a skill is used, that notice belongs to the host, not to this answer.)

## Step 1. Classify the task

Decide which task type the purpose belongs to. Common types: summarize or extract · generate or write · review or evaluate · classify or route · converse or support · transform or translate. The type shapes Steps 2 to 4. If the purpose mixes types, name the main one and note the second.

## Step 2. Write the reasoning steps

Write the sequence of checks the model should go through before and while producing its answer, specific to the task type. Examples:

- Summarize or extract: identify the core thesis, map how the main elements relate, then select the points with the highest value or most direct use.
- Review or evaluate: set the evaluation dimensions first, gather evidence for each dimension, look for counter-evidence, then reach a judgment.
- Generate or write: fix the audience and what a successful result looks like, list the constraints, then produce.

These are steps for doing the task. They are not "check your work again" instructions. Whether the target model needs an extra self-check at the end is a platform question, answered in Step 5. A separate review pass that the user runs afterwards is a different thing and may be recommended.

## Step 3. Set measurable success criteria

Write quality criteria that someone could check, not adjectives. For a summary, for example: every point states its supporting argument and where it applies; numbers and formulas are kept exactly; none of the core claims is left out. Avoid "high quality", "clear", "engaging" unless you say what would show it.

## Step 4. Fix the output fields

Define the fields of the answer and their order. For a summary, for example: principle, then two or three supporting details, then how to apply it, then the top takeaways. Give field names and what goes in each.

## Step 5. Read the platform's current official guidance

1. Identify the platform and, if possible, the exact model. A chat product is not the same as an API: the model behind a product can depend on the plan, the client, and the user's settings, and the vendor's pages may not name a single default. If the user named only a product (for example "ChatGPT"), say which model you will assume and why, and cite the page that supports that choice (for example a page that lists or recommends models for that product). If no page you read settles it, say that the model is unknown and use only guidance that does not depend on the model.
2. Open `references/official-sources.md`. Start from the vendor's general prompting guide and its latest-model or model-overview page, and follow them to the page for the specific model when one exists.
3. From the pages you actually read, note what applies to this prompt:
   - how the vendor recommends structuring a prompt (sections, tags, role statement, examples or no examples);
   - reasoning or effort controls and their recommended settings for this kind of task;
   - instructions the vendor says to remove or avoid for this model, including outdated habits;
   - output formatting conventions;
   - whether the model is marked preview, beta, or legacy.
4. Keep the URL and the date for each page you used, and note which point each page supports. Every vendor-specific point you rely on later, including the model you assume, needs one of these pages behind it.

Use only what the pages say. Do not fill gaps with remembered tips about a vendor; if the pages do not cover a point, leave it out or say it was not covered.

**If you cannot open web pages:** say so before writing. Ask the user to paste the relevant guide text, or, if they prefer, write the prompt from Steps 1 to 4 with a generic structure (role, context, task, constraints, output format) and state in the usage note that no platform guidance was checked.

**If the platform has no official prompting guidance** (for example a tool built on another company's model): use the underlying model's vendor guidance if the user knows which model it is; otherwise use the generic structure above. For tools that answer from documents the user uploads, require answers to cite those documents and to say when the documents do not cover a question.

## Step 6. Write the prompt

Combine Steps 1 to 4 (what to do and how) with Step 5 (how to say it on this platform).

Rules:

1. **Method first.** Finish Steps 1 to 4 before applying platform conventions. The method decides the substance; the platform decides the form.
2. **One platform.** Use the conventions of the target platform only. Do not mix conventions from different vendors.
3. **Substance, not headings.** The prompt must contain the actual reasoning steps, success criteria, and output fields, not just the headings "Role / Task / Constraints / Output".
4. **Measured, positive constraints.** State limits as targets with a measure ("at most 200 words") rather than bare prohibitions where you can.
5. **Self-contained.** The prompt must work when pasted alone. No source numbers like `[7]`, no references to these instructions, no tool or feature names that the target platform does not have.
6. **Plain structure.** Unless the purpose is casual or social, do not use emoji or decorative symbols as section markers. For coding agents, use plain text or Markdown headings only.
7. **Ready to paste.** Produce one complete prompt.

## Output

Return three parts, in this order:

```
Summary: Purpose: <purpose> | Platform: <platform and model, and whether assumed> | Task type: <Step 1>

Prompt (paste this part only):
<the complete prompt>

Usage notes:
- The model you assumed and why, with the URL of the page that supports it and the date read (or "model unknown").
- Conventions from the vendor pages that the prompt follows, each with its source URL and the date read.
- Settings the user should apply outside the prompt (for example a reasoning or effort setting), each with its source URL and the date read.
- Anything the pages did not cover, any preview or legacy status, and anything else you assumed.
```

## Limits

- The skill is a method, not a guarantee. The quality of the prompt depends on how well the purpose is stated and on the agent following these steps.
- Vendor guidance changes often. The prompt reflects the pages read on the day; recheck them when the model changes.
- The source list in `references/official-sources.md` is a starting point dated at the top of that file. Pages move. If a link fails, first check whether the page is gone or only your fetching tool was refused (some vendor sites refuse plain HTTP clients but serve the page to a browser or another reading tool), and record the address you finally read. If the page is gone, look for the vendor's current equivalent and say that you did.
- Testing so far is limited; see `VALIDATION.md` in the skill's repository, not in this installed folder.
