# このリポジトリでの指示（keigoly-jp）

apex `keigoly.jp` のポータル（ゲートウェイ）サイト。official.keigoly.jp と claw.keigoly.jp への入口 1 ページのみ。

## 設計原則

- **1 ページ・依存最小を維持する。** React / 追加インテグレーションは入れない（ヒーローは CSS のみで動く）。
- デザイントークン（`kg-` 色・Cinzel / Shippori Mincho）は KeigolyOfficialSite と共通。変える時は両サイトの世界観を確認。
- `worker/index.ts` の 301 リダイレクト表（旧ポートフォリオのパス → official.keigoly.jp）は SEO 温存の生命線。**消さない・減らさない**。official 側にパスを追加したらここにも追加を検討。

## デプロイ

- main push → GitHub Actions → `wrangler deploy`（claw-keigoly-jp と同型）
- apex ドメイン付替は wrangler.toml の `routes` コメントを解除して deploy（Phase 3 手順）

## 経緯

2026-07-10 サイト統合プロジェクトで新設。旧 keigoly.jp（ポートフォリオ）は official.keigoly.jp へ移設。計画・手順は ai-context-engine 側のセッション記録および memory を参照。
