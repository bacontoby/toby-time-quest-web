# TOBY 時間大作戰｜Next.js + Supabase

這是一份可部署到 Vercel 的第一版網頁專案，沿用已建立的 Supabase 資料表與 RPC：

- 家長 Email/Password 登入
- TOBY / HARPER 角色切換
- 台北時區的日期切換、每日任務清單
- 以 `submit_daily_task(p_task_id)` 提交打卡
- 以 `review_daily_task(p_task_id,p_approve)` 核准或拒絕
- 以 `point_transactions.amount` 加總顯示餘額
- 不從瀏覽器直接修改任務狀態或點數交易

## 1. 必要設定

在專案根目錄新增 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xrnnynquzehwwpcptqzy.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=你的 sb_publishable_ 公開金鑰
```

**絕對不要使用 `sb_secret_`、`service_role` 或資料庫密碼。**

## 2. 本機測試（選用）

Node.js 20.9+：

```bash
npm install
npm run dev
```

開啟 http://localhost:3000 。

## 3. GitHub + Vercel 部署

1. GitHub 建立一個**私人**空白 repository，例如 `toby-time-quest-web`。
2. 把本 ZIP 解壓縮後的**所有內容**（包括 `app` 資料夾和 `package.json`）放到 repo 根目錄。可透過 GitHub Codespaces 上傳 ZIP 並在終端機解壓縮，或本機 Git push。
3. Vercel → Add New → Project → Import Git Repository → 選取 repo。
4. Framework Preset 選 Next.js；Root Directory 保持 `./`。
5. 在 Environment Variables 新增 `NEXT_PUBLIC_SUPABASE_URL` 與 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`，值與 `.env.local` 相同。
6. Deploy，取得 `https://...vercel.app` 網址。
7. Supabase → Authentication → URL Configuration：Site URL 改成正式 Vercel 網址；如果使用 Email magic link/OAuth，新增相對應的 Redirect URLs。純密碼登入通常不依賴 redirect。
8. 使用 Supabase Authentication 裡已建立、且 `parent_members` 綁定為 owner 的家長帳號登入。

## 4. 目前的資料庫假設

- `parent_members` 欄位：`family_id,user_id,role`
- `children` 欄位：`id,family_id,nickname,avatar_url`
- `daily_tasks` 欄位：`id,child_id,task_date,title_snapshot,points_snapshot,status`
- `point_transactions` 欄位：`id,child_id,amount`
- 家長能透過 RLS SELECT 以上資料。
- `submit_daily_task(uuid)` 與 `review_daily_task(uuid,boolean)` 已建立，且已授權 `authenticated` EXECUTE。

如果頁面顯示 `permission denied` 或 `0 rows`，先檢查該家長登入 UID、`parent_members` 綁定及 RLS，而不是關閉 RLS。

## 5. 尚未實作

- 孩子獨立登入與權限（現有 submit RPC 只允許 owner）
- 任務排程自動生成
- 獎勵商城、兌換與庫存、成就徽章
- PWA 離線安裝與通知
- 多頁管理後台

此版是可用的家長操作 MVP，不代表已完成安全滲透測試；正式對外開放前應檢查所有 RLS、RPC 權限與資料表的 INSERT/UPDATE/DELETE 政策。
