# Prompt Architect: first use / 最短教學

Version 0.1.0 · experimental prerelease · Ansel · MIT

[Skill and installation instructions](../../skills/prompt-architect/README.md) · [Release](https://github.com/anselbuilds/agent-skills/releases/tag/prompt-architect-v0.1.0) · [Validation](VALIDATION.md)

## English

### What you will do

Build a prompt that turns meeting notes into action items for use in ChatGPT. The skill first defines the task, checks, and output fields; it then reads current official guidance for the target platform. You receive a prompt to paste into that platform, plus source notes. It does not run or prove the resulting prompt for you.

### 1. Get and load the skill

Download `prompt-architect-v0.1.0.zip` from the release linked above and unzip it. Copy the entire `prompt-architect/` folder, including `references/` and `LICENSE`, into your agent's skill directory. The final path must end in `prompt-architect/SKILL.md`, not two nested `prompt-architect` folders. If you downloaded GitHub's whole source archive instead, use `skills/prompt-architect/` inside it.

Choose the destination from the [installation table](../../skills/prompt-architect/README.md#install), which separates documented locations from the path actually tested. Check that your host lists the skill; refresh or restart it if needed. If it is still absent, check the folder location rather than copying it into several locations.

To try it before installing, open the extracted folder in an agent that can read files, and prepend the request below with: `Read prompt-architect/SKILL.md and follow it.` This tests explicit file use, not automatic discovery. The agent needs web access for platform-specific guidance.

### 2. Ask for one prompt

Paste this into the agent that loaded the skill:

```text
Use prompt-architect. Write a prompt that turns meeting notes into an action table, to run in ChatGPT. The table must contain task, owner, deadline, and the supporting excerpt from the notes. Use only information stated in the notes; mark missing owners and deadlines as "not stated". Separate confirmed actions from suggestions. I do not know which ChatGPT model will be selected.
```

You should receive a summary, a complete prompt, and usage notes. The notes should cite the official pages actually read and their dates. An unknown model should stay unknown unless a cited source supports an explicit assumption. If browsing is unavailable, use the skill's disclosed generic fallback or supply the guidance yourself; do not describe that run as checked against current vendor guidance.

### 3. Try the generated prompt

Open a fresh ChatGPT conversation. Paste only the generated **Prompt** section, then supply these synthetic notes when it asks for input:

```text
Mira agreed to send the draft to Leon by 2026-11-03.
Leon agreed to review the draft; no deadline was set.
Someone suggested adding a chart. No one accepted that task.
```

Check the result against these teaching expectations:

- Two confirmed actions: Mira sends the draft; Leon reviews it.
- Mira's deadline is 2026-11-03. Leon's deadline is "not stated".
- Adding a chart stays a suggestion, with no invented owner or deadline.
- Each item cites the corresponding excerpt; the answer does not invent additional decisions.

These are hand-written expected results for a synthetic fixture, not an execution transcript. The generated prompt has not been benchmarked on ChatGPT. If it fails this check, record the input, result, model if known, and failure, then revise and try again before using real notes.

### 4. Use it for your task

Replace the meeting task and ChatGPT with your purpose and target platform. Give constraints that matter: audience, input type, required fields, and what counts as success. Keep the generated prompt separate from the skill's usage notes. Check its result on a small example you can judge before relying on it.

[Report a reproducible problem](https://github.com/anselbuilds/agent-skills/issues); use synthetic inputs and omit private meeting notes or credentials. Sensitive security reports go through [private vulnerability reporting](https://github.com/anselbuilds/agent-skills/security/advisories/new). There is no promised response time.

## 繁體中文

### 你會完成甚麼

產生一段可貼到 ChatGPT、把會議紀錄轉成行動清單的 prompt。Skill 先定義任務步驟、可核對標準及輸出欄位，再讀取目標平台的當前官方指引。你取得的是 prompt 與來源說明；skill 不會代你執行或證明這段 prompt 的效果。

### 1. 下載與載入

從上方 Release 下載 `prompt-architect-v0.1.0.zip` 並解壓。把整個 `prompt-architect/` 資料夾放進 agent 的技能目錄，保留 `references/` 與 `LICENSE`。最後應是 `prompt-architect/SKILL.md`，不要多包一層同名資料夾。若下載 GitHub 全 repo 的原始碼壓縮檔，使用裡面的 `skills/prompt-architect/`。

按 [安裝說明](../../skills/prompt-architect/README.md#install)選擇宿主路徑；文件分開標示官方列出的路徑與本次實際測過的路徑。確認技能清單出現它，必要時重新整理或重啟宿主。仍未出現時先查路徑，避免同時複製到多個地方。

也可先不安裝：用能讀本機檔案的 agent 開啟解壓後的資料夾，在以下請求前加上「請讀取 `prompt-architect/SKILL.md` 並依其方法執行」。這只驗證指定檔案使用，不等於自動探索。查平台指引需要網路讀取能力。

### 2. 請它產生一段 prompt

```text
使用 prompt-architect。幫我寫一段把會議紀錄轉成行動表的 prompt，目標平台是 ChatGPT。表格要包含任務、負責人、期限及支持該項目的紀錄原文。只採用紀錄明示的資料；沒有負責人或期限時標示「未提及」。確定行動與建議事項要分開。我不知道會選用哪個 ChatGPT 模型。
```

預期收到摘要、完整 prompt、使用說明三部分。使用說明應附上當次實際讀過的官方網址與日期；不能無依據猜測產品正在使用哪個模型。若無法讀網頁，依 skill 說明選擇通用版本或提供指引原文，並保留「未查平台指引」的限制。

### 3. 用合成資料試一次

開新 ChatGPT 對話，只貼生成結果的 **Prompt** 部分，再依它的要求提供以下合成紀錄：

```text
美娜同意在 2026-11-03 前把初稿交給力行。
力行同意審閱初稿，但沒有定下期限。
有人建議加入圖表，沒有任何人承接這項工作。
```

核對結果：

- 確定行動只有兩項：美娜交稿、力行審閱。
- 美娜期限為 2026-11-03；力行期限為「未提及」。
- 加圖表仍是建議，不能自行補上負責人或期限。
- 每項附相應原文，不新增紀錄沒有的決定。

以上是人工列出的合成測試預期，不是實測輸出紀錄；尚未對生成 prompt 在 ChatGPT 的效果作基準測試。若結果不符，保留輸入、結果、已知模型及具體錯誤，修訂後再測，才改用正式資料。

### 4. 換成你的任務

替換用途與平台，交代讀者、輸入種類、必要欄位及成功標準。只把生成的 prompt 貼到目標平台，另行保留使用說明及來源。先用你能判斷的小例子確認效果。

遇到問題可開 [Issue](https://github.com/anselbuilds/agent-skills/issues)，附合成重現資料，不貼私人會議紀錄或憑證。敏感漏洞走 [私密回報](https://github.com/anselbuilds/agent-skills/security/advisories/new)，不承諾回覆時限。

## Relationship to Trigpoint / 與 Trigpoint 的關係

This tutorial is included in the skill release. The [Trigpoint notebook page](https://trigpoint.pub/notebooks) also lists a separate NotebookLM tool called Platform-Aware Prompt Architect v2.5. Its version number and access route do not identify this skill. A dedicated Trigpoint article for this skill is not yet published.

本教學與 skill 同步發布。[Trigpoint 筆記本頁](https://trigpoint.pub/zh-Hant/notebooks)另有 NotebookLM「全動態提示詞引擎 v2.5」；它的版本號與入口不代表此 skill。本 skill 的專屬 Trigpoint 文章尚未發布。
