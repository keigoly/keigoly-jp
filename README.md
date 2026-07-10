# keigoly.jp — KEIGOLY ポータル

> 公開 URL: https://keigoly.jp/ (Phase 3 の apex 切替後)

FromSoftware 公式サイト風の全画面ヒーローから、二つの世界へ入口を選ぶゲートウェイ。

| 入口 | 行き先 | 内容 |
| --- | --- | --- |
| OFFICIAL | https://official.keigoly.jp/ | ポートフォリオ・作品・プロフィール ([KeigolyOfficialSite](https://github.com/keigoly/KeigolyOfficialSite)) |
| CLAW | https://claw.keigoly.jp/ | Clawくんと歩む — 持たざる者による AI 黙示録 ([claw-keigoly-jp](https://github.com/keigoly/claw-keigoly-jp)) |

## 技術スタック

- Astro 5（SSG・1ページ）
- TailwindCSS 4（`kg-` デザイントークンは KeigolyOfficialSite と共通）
- Cloudflare Workers + static assets（claw-keigoly-jp と同型）
- ヒーローは CSS のみの 3枚クロスフェード（React/JS 不使用）

## Worker の役割

`worker/index.ts` は静的アセット配信に加え、旧 keigoly.jp（ポートフォリオ時代）の
既存パス (`/about` `/works` `/blog` `/contact` `/privacy` `/tokushoho` `/en` `/admin` `/images`)
を `https://official.keigoly.jp` へ **301 転送**し、検索インデックスと被リンクを温存する。

## ローカル開発

```bash
npm install
npm run dev        # → http://localhost:4321 (Astro のみ・リダイレクトなし)

# Worker 込みの動作確認 (リダイレクトも検証できる)
npm run build
npx wrangler dev   # → http://localhost:8787
```

## デプロイ

main への push で GitHub Actions が `wrangler deploy`（要 `CLOUDFLARE_API_TOKEN` シークレット）。
手動デプロイは `npm run build && npx wrangler deploy`。

apex `keigoly.jp` の付替は wrangler.toml の `routes`（コメントアウト中）を有効化して行う。

## 関連リポジトリ

- 公式サイト: https://github.com/keigoly/KeigolyOfficialSite
- Clawくんと歩む: https://github.com/keigoly/claw-keigoly-jp
- メインプロジェクト: https://github.com/keigoly/ai-context-engine
