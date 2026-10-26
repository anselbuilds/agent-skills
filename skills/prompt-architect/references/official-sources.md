# Official sources

First-party documentation from the model vendors. Read the pages themselves; this file only tells you where to start.

Source-list revision: 2026-10-24. Links last confirmed to open: 2026-10-26 (27 by HTTP after redirects; the OpenAI model-release-notes page refused that client and was read with a web reader).

How to use it: start with the vendor's general guide and its latest-model or model page, then open the page for the exact model if one exists. Model-specific pages are replaced when new models come out, so the ones listed under "Model pages" are examples of the pattern at the time of compiling, not a complete or permanent list.

## OpenAI (ChatGPT, Codex, OpenAI API)

General guides

- Prompt engineering: https://developers.openai.com/api/docs/guides/prompt-engineering
- Prompt guidance: https://developers.openai.com/api/docs/guides/prompt-guidance
- Reasoning models: https://developers.openai.com/api/docs/guides/reasoning
- Latest model guide (add `?model=<model id>` for a specific model): https://developers.openai.com/api/docs/guides/latest-model
- Models catalog (settings each model accepts, such as reasoning effort levels): https://developers.openai.com/api/docs/models
- Model release notes: https://help.openai.com/en/articles/9624314-model-release-notes

Codex (the old `developers.openai.com/codex/` addresses redirect to these)

- Prompting: https://learn.chatgpt.com/docs/prompting
- Models (recommended models, choosing reasoning effort): https://learn.chatgpt.com/docs/models
- Custom instructions with AGENTS.md: https://learn.chatgpt.com/docs/agent-configuration/agents-md

Model pages, examples of the pattern

- https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6.1-sol
- https://developers.openai.com/api/docs/models/gpt-6.1-sol

## Anthropic (Claude, Claude Code, Claude API)

General guides

- Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Effort parameter: https://platform.claude.com/docs/en/build-with-claude/effort
- Adaptive thinking: https://platform.claude.com/docs/en/build-with-claude/adaptive-thinking
- Extended thinking: https://platform.claude.com/docs/en/build-with-claude/extended-thinking
- Migration guides (index): https://platform.claude.com/docs/en/about-claude/models/migration-guide
- Effective context engineering for AI agents: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

Model pages, examples of the pattern (`prompting-claude-<model>`, `models/<model>/overview`, `models/<model>/whats-new-<model>`)

- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5
- https://platform.claude.com/docs/en/models/opus-5-5/overview
- https://platform.claude.com/docs/en/models/opus-5-5/whats-new-opus-5-5
- https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5
- https://platform.claude.com/docs/en/models/sonnet-5-5/overview

## Google (Gemini, Gemini API, Vertex AI)

General guides

- Prompt design strategies: https://ai.google.dev/gemini-api/docs/prompting-strategies
- Latest model (what's new): https://ai.google.dev/gemini-api/docs/latest-model
- Thinking: https://ai.google.dev/gemini-api/docs/thinking
- System instructions (Vertex AI): https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/system-instructions

Model pages, examples of the pattern

- https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash
- https://deepmind.google/models/model-cards/gemini-3-8-flash/
