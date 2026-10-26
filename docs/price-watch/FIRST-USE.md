# price-watch: first use / 最短教學

Version 0.1.0 · experimental prerelease · Ansel · MIT

[Skill README](../../skills/price-watch/README.md) · [Install and use](README.md#install-and-use) · [Registry commands](../../skills/price-watch/references/registry.md) · [Release](https://github.com/anselbuilds/agent-skills/releases/tag/price-watch-v0.1.0) · [Validation](VALIDATION.md)

## English

### What it does and does not do

price-watch helps an agent prepare a Safari Notify Me watch for one exact product and keeps a local record of it. Safari does the checking and sends the notification. The skill's Python helper only stores the conditions, the evidence that you or the agent recorded, and the history. It does not fetch prices, schedule checks, send notifications or control Safari.

Use it to keep watching a product for a price drop or a restock, to change a target, to list your watches or to stop one. A one-off price check does not need it.

The work has five stages. Each has its own evidence, and a record in one stage does not prove the next:

| Stage | Where | What proves it |
|---|---|---|
| 1. Prepare | Local helper | A `draft` record and a setup card |
| 2. Set up | Safari, by you or by an agent with Computer Use | Nothing yet |
| 3. Check | Safari's Edit view, reopened | `active`, with evidence stating who checked what |
| 4. Notify | Safari and macOS | Only a notification that actually arrived |
| 5. Stop | Safari, then the local helper | `stopped`, after the watch is gone from Safari |

### Before you start

- **Part A (rehearsal):** Python 3.9 or later with SQLite and system time zone data. Standard library only; no API key or package install. Safari is not used.
- **Part B (real watch):** a Mac whose Safari offers Notify Me. Apple's [Notify Me guide](https://support.apple.com/en-in/guide/safari/ak35p2kk9h5r/mac) describes support on macOS 27; availability also depends on Apple Intelligence eligibility, language and region. Safari system notifications must be allowed. The skill does not enable system features or accept terms for you.
- **For an agent to do the Safari steps:** a host with a Computer Use tool. Without one, you do those steps yourself from the setup card.
- The skill's instructions and the setup cards it generates are in Traditional Chinese.

Tested scope: the helper's 18 CLI and state tests pass on macOS arm64 with Python 3.9.6. Automatic discovery of the skill by agent hosts is untested, and so is Safari on other devices, regions and languages. See [VALIDATION.md](VALIDATION.md).

### Part A. Rehearse every stage with a synthetic item

Download the source code archive (zip) from the [release](https://github.com/anselbuilds/agent-skills/releases/tag/price-watch-v0.1.0), unzip it, and open a terminal in the extracted folder. Every command below passes `--db runtime/demo/watchlist.sqlite3`, so it writes only to a throwaway database in that folder, never to a registry you may already have. The item is a synthetic fixture on example.com, not a real product. Do not create a Safari watch from it.

**1. Prepare.**

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 add demo-ssd --file skills/price-watch/examples/demo-contract.json
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 handoff demo-ssd
```

The first command prints the record with `"status": "draft"` and `"verified_at": null`. The second prints the setup card, abridged here:

```json
{
  "id": "demo-ssd",
  "action": "setup",
  "local_status": "draft",
  "url": "https://example.com/products/demo-ssd",
  "native_condition": "只監控此頁的 Synthetic SSD，規格 2TB / DEMO-2000 / one unit，賣家 Example seller，…",
  "schedule": "Daily at 09:00",
  "timezone": "Etc/UTC",
  "native_action_performed": false
}
```

`native_action_performed: false` is the point: the card is instructions for Safari and changes nothing by itself. Running the same `add` again fails with an error rather than replacing the record.

**2. Record a check.** In real use you record `active` only after Safari's Edit view has been reopened and checked (Part B, step 3). No Safari watch exists here, so the evidence says so:

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status active --evidence "Rehearsal only; no Safari watch exists"
```

The status becomes `active`; `delivery_verified_at` stays `null`. The helper accepts whatever evidence it is given, because it has no way to look at Safari. That is why Part B asks for specific evidence.

**3. Stop, in order.** Recording `stopped` straight away is refused:

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status stopped --evidence "Rehearsal only"
```

It prints `Error: Call request-stop first` and exits with status 2. Request the stop, read the stop card, then record it:

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 request-stop demo-ssd
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 handoff demo-ssd
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status stopped --evidence "Rehearsal only; no Safari watch exists"
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 list
```

`request-stop` sets `stop_pending`. The card now has `"action": "stop"`, and its steps (in Chinese) say to delete the watch from Notify Me's Edit view and that closing the tab is not stopping. `list` then shows `demo-ssd` as `stopped`. A stopped record cannot be revised or reactivated; to watch again, add a new id.

**4. Clean up.** Delete the `runtime/demo/` folder.

You have finished Part A when you have seen `draft`, `active`, `stop_pending` and `stopped`, the refused stop, and no Safari window. The outputs above come from a run of these commands on 2026-10-26 (macOS arm64, Python 3.9.6) with the synthetic fixture.

### Part B. Watch a real product

**1. Install.** Copy the whole `skills/price-watch/` folder into your agent's skill directory, so that the result ends in `price-watch/SKILL.md`. Locations, and the database setting that personal installs need (`PRICE_WATCH_DB` or `--db`), are in [Install and use](README.md#install-and-use). Check that your host lists the skill. If it does not, you can still ask the agent to read `price-watch/SKILL.md` directly; that tests explicit file use, not discovery.

**2. Ask for a setup card.** Replace the parts in angle brackets:

```text
Use price-watch. Prepare a price watch for <product URL>, exact model <model>, seller <seller>, new, one unit. Notify me when the listed price is at or below <currency and amount> and the item is in stock, checking daily at 09:00 in <time zone>. Read the product page for the baseline first; if you cannot read the price, stop and tell me. Generate a setup card; I will configure Safari myself.
```

Expect the agent to read the page, save a baseline with its source and time, add the watch as `draft`, and give you the card: URL, condition text, frequency, time zone and steps. If it cannot read the price, it should say so rather than invent a baseline. A listed price excludes unlisted shipping; ask for an all-in price only when shipping and tax are known.

**3a. Set it up yourself.** Open the URL in Safari, choose Notify Me from the Page Menu, paste the condition, set the frequency and time in Edit, and save. Reopen Edit and compare the product, threshold, frequency and time with the card. If your Mac's time zone differs from the card's, convert the time; do not change the system time zone. Then tell the agent what you saw, for example: "I reopened Edit: the condition matches the card, daily at 09:00, Mac time zone UTC." The agent records `active` with evidence marked user-confirmed. A plain "done" is not enough; the agent should ask what you checked.

**3b. Or let the agent do it.** If your host has Computer Use, ask: "Use price-watch to set up this watch in Safari and verify it." The agent follows the skill's Safari steps, reopens Edit to read the settings back, and records `active` as agent-observed. If it cannot confirm the settings, it records `needs_attention`, names the problem and gives you the card.

**4. Check status.** Ask: "Use price-watch to list my watches and when each was last verified." Each record shows its status, verification time and evidence. This is the last known local record, not a live reading of Safari. To change a target, ask the agent to revise the watch: it becomes `needs_attention`, and Safari keeps the old conditions until you edit the existing watch and check it again. Notification delivery is recorded separately, only after a notification has actually arrived; until then it stays empty, even for an `active` watch. When a notification arrives, check the product page again before you buy. The skill never buys.

**5. Stop.** Ask the agent to stop the watch. It records `stop_pending` and gives you a stop card. In Safari, open the product page, then Notify Me, Edit, Delete, and confirm that the page no longer has a watch. Tell the agent what you saw; only then is the watch recorded as `stopped`. Closing the tab does not stop a watch, and an expiry date is only a local reminder, not an automatic stop.

You have finished Part B when you hold a setup card, an `active` record whose evidence names what was checked, and, when you are done watching, a `stopped` record made after the watch was removed from Safari.

### Limits

- No notification has been observed in testing of this release. An end-to-end delivery test needs a separate, agreed test watch on a real product and a real qualifying change. Do not lower the threshold of a watch you rely on just to test notifications.
- Safari decides how prices are read, when checks run and whether alerts repeat. The skill does not guarantee any of these.
- Apple's documentation, checked on 2026-10-18, showed no Notify Me management API, and the skill does not read Safari's private data. If you need monitoring without Safari, this version cannot provide it.
- The registry is plaintext SQLite. Keep it outside the skill folder and do not share runtime files, browser profiles or purchase plans.

[Report a reproducible problem](https://github.com/anselbuilds/agent-skills/issues) with synthetic data; leave out real watch lists, account data and credentials. Sensitive security reports go through [private vulnerability reporting](https://github.com/anselbuilds/agent-skills/security/advisories/new). There is no promised response time.

## 繁體中文

### 它做甚麼、不做甚麼

price-watch 協助 agent 為單一指定商品準備 Safari Notify Me 監控，並在本機記錄該監控。檢查與通知由 Safari 負責；skill 的 Python 程式只保存條件、你或 agent 記下的核對證據及歷史，不抓價、不排程、不發通知，也不操作 Safari。

適用於持續追蹤降價或補貨、修改門檻、列出或停止監控。單次查價不需要它。

整個流程分五個階段，各有自己的證據；前一階段的紀錄不能證明下一階段：

| 階段 | 在哪裡做 | 憑甚麼證明 |
|---|---|---|
| 1. 準備 | 本機程式 | `draft` 紀錄與設定卡 |
| 2. 設定 | Safari，由你或具 Computer Use 的 agent 操作 | 尚無證據 |
| 3. 核對 | 重新打開 Safari 的 Edit | `active`，證據寫明由誰核對了甚麼 |
| 4. 通知 | Safari 與 macOS | 只有實際收到的通知 |
| 5. 停止 | 先 Safari，後本機程式 | Safari 已無該監控後的 `stopped` |

### 開始前

- **A 部（預演）**：Python 3.9 以上，含 SQLite 與系統時區資料；只用標準函式庫，不需 API key 或安裝套件。不會用到 Safari。
- **B 部（實際監控）**：Safari 提供 Notify Me 的 Mac。Apple 的 [Notify Me 文件](https://support.apple.com/en-in/guide/safari/ak35p2kk9h5r/mac)說明 macOS 27 支援；能否使用另依 Apple Intelligence 資格、語言及地區而定，並須允許 Safari 系統通知。skill 不會代你開啟系統功能或接受條款。
- **由 agent 代做 Safari 步驟**：宿主須提供 Computer Use 工具；沒有時由你依設定卡自行操作。
- 介面名稱沿用 skill 文件的英文寫法（Page Menu、Notify Me、Edit、Delete）；系統語言不同時，畫面名稱可能不同。

已驗證範圍：本機程式 18 項 CLI 與狀態測試於 macOS arm64、Python 3.9.6 全數通過。agent 宿主自動探索此 skill 尚未測試；其他裝置、地區、語言的 Safari 亦未測試。詳見 [VALIDATION.md](VALIDATION.md)。

### A 部：用合成項目預演每個階段

從 [Release](https://github.com/anselbuilds/agent-skills/releases/tag/price-watch-v0.1.0) 下載原始碼壓縮檔（zip）並解壓，在解壓後的資料夾開終端機。以下每條指令都帶 `--db runtime/demo/watchlist.sqlite3`，只寫入該資料夾內可丟棄的資料庫，不會寫進你可能已有的清單。項目是 example.com 上的合成資料，不是真實商品，不要拿它建立 Safari 監控。

**1. 準備。**

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 add demo-ssd --file skills/price-watch/examples/demo-contract.json
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 handoff demo-ssd
```

第一條印出紀錄，`"status": "draft"`、`"verified_at": null`。第二條印出設定卡，重點欄位為 `"action": "setup"` 與 `"native_action_performed": false`：設定卡只是給 Safari 的操作說明，本身不改變任何狀態。同一 `add` 再跑一次會報錯，不會覆蓋原紀錄。

**2. 記錄核對。** 實際使用時，必須重新打開 Safari 的 Edit 核對後才記 `active`（見 B 部第 3 步）。此處沒有 Safari 監控，證據就照實寫：

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status active --evidence "Rehearsal only; no Safari watch exists"
```

狀態變成 `active`，`delivery_verified_at` 仍是 `null`。程式無法查看 Safari，給它甚麼證據都會收下，所以 B 部要求寫明具體核對內容。

**3. 依序停止。** 直接記 `stopped` 會被拒：

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status stopped --evidence "Rehearsal only"
```

輸出 `Error: Call request-stop first`，結束碼 2。先要求停止、讀停止卡，再記錄：

```sh
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 request-stop demo-ssd
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 handoff demo-ssd
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 record-native demo-ssd --status stopped --evidence "Rehearsal only; no Safari watch exists"
python3 skills/price-watch/scripts/watchlist.py --db runtime/demo/watchlist.sqlite3 list
```

`request-stop` 後為 `stop_pending`；設定卡變成 `"action": "stop"`，步驟寫明到 Notify Me 的 Edit 刪除，並提醒關閉分頁不等於停止。`list` 顯示 `demo-ssd` 為 `stopped`。已停止的紀錄不能再修改或重新啟用；要再監控，用新 id 新增。

**4. 清理。** 刪除 `runtime/demo/` 資料夾。

看過 `draft`、`active`、`stop_pending`、`stopped`，以及被拒的停止，且全程沒有開 Safari，即完成 A 部。以上輸出取自 2026-10-26 以合成資料實際執行這些指令的結果（macOS arm64、Python 3.9.6）。

### B 部：監控真實商品

**1. 安裝。** 把整個 `skills/price-watch/` 資料夾複製到 agent 的技能目錄，最後應是 `price-watch/SKILL.md`。各宿主位置，以及個人安裝須設定的資料庫位置（`PRICE_WATCH_DB` 或 `--db`），見 [安裝與實際使用](README.zh-Hant.md#安裝與實際使用)。確認宿主的技能清單出現它；若沒有，仍可請 agent 直接讀 `price-watch/SKILL.md`，但這只驗證指定檔案使用，不等於自動探索。

**2. 要一張設定卡。** 替換角括號內容：

```text
使用 price-watch。替 <商品網址> 準備價格監控，型號 <型號>、賣家 <賣家>、新品、數量 1。一般標價不高於 <幣別與金額> 且有現貨時通知，每日 <時區> 09:00 檢查。先讀商品頁取得基準，讀不到價格就停下告訴我。只產生設定卡，由我自己在 Safari 設定。
```

預期 agent 讀取商品頁、保存附來源與時間的基準、以 `draft` 新增，並交給你設定卡：網址、條件文字、頻率、時區及步驟。讀不到價格時應照實回報，不編造基準。一般標價不含未列明運費；運費與稅費都清楚時才要求含全部費用的總價。

**3a. 自己在 Safari 設定。** 用 Safari 開啟網址，從 Page Menu 選 Notify Me，貼上條件，在 Edit 設定頻率與時間後儲存。重新打開 Edit，逐項對照設定卡的商品、門檻、頻率與時間。Mac 時區與設定卡不同時先換算，不要改系統時區。然後把看到的內容告訴 agent，例如：「我重新打開 Edit：條件與設定卡相同，每日 09:00，Mac 時區 UTC。」agent 以 user-confirmed 證據記 `active`。只回「好了」不足以證明；agent 應追問你核對了甚麼。

**3b. 或讓 agent 代做。** 宿主有 Computer Use 時，可說：「使用 price-watch 在 Safari 完成這個監控並核對。」agent 依 skill 的 Safari 步驟操作，重新打開 Edit 讀回設定，以 agent-observed 記 `active`；無法確認時記 `needs_attention`，指出卡點並交出設定卡。

**4. 核對狀態。** 可說：「使用 price-watch 列出監控及各自最後核對時間。」每筆顯示狀態、核對時間與證據；這是本機最後記錄，不是 Safari 即時盤點。要改門檻，請 agent 修改：狀態轉為 `needs_attention`，在你編輯原有監控並再次核對之前，Safari 仍用舊條件。通知送達另行記錄，只有實際收到通知後才記；即使是 `active`，未收到前該欄仍為空。收到通知後先重新核對商品頁再決定是否購買；skill 不會下單。

**5. 停止。** 請 agent 停止該監控；它記 `stop_pending` 並交出停止卡。在 Safari 開啟商品頁，Notify Me、Edit、Delete，確認該頁已無監控，再把結果告訴 agent，才記 `stopped`。關閉分頁不等於停止；到期日只是本機提醒，不會自動停止。

手上有設定卡、有一筆證據寫明核對內容的 `active` 紀錄，以及不再監控時、在 Safari 移除後才記下的 `stopped`，即完成 B 部。

### 限制

- 本版測試至今未觀察到任何通知送達。端到端送達測試需要另設、事先約定的測試監控，以真實商品及真實符合條件的變動進行。不要為測試通知而調低你實際依賴的監控門檻。
- 價格如何判讀、何時檢查、會否重複通知由 Safari 決定，skill 不作保證。
- 2026-10-18 查閱的 Apple 文件未見 Notify Me 管理 API，skill 也不讀取 Safari 私有資料。需要不經 Safari 的監控時，本版無法提供。
- 清單是明文 SQLite。放在 skill 資料夾外，不要分享 runtime 檔、瀏覽器設定檔或購買計畫。

遇到可重現問題請開 [Issue](https://github.com/anselbuilds/agent-skills/issues)，附合成資料，不貼真實監控清單、帳戶資料或憑證。敏感漏洞走[私密回報](https://github.com/anselbuilds/agent-skills/security/advisories/new)，不承諾回覆時限。
