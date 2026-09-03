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

## 母艦連携(必読)

- このディレクトリは母艦 `ai-context-engine` の**衛星** `keigoly-jp` です。正本は母艦の登録簿 `/Users/Shared/Developments/ai-context-engine/claw_bot/config/projects.json`。
- **Discord**: `#keigoly-jp`(Clawくん がこの衛星のプロジェクトカードを読んで応答する)。通知 source は `project:keigoly-jp`。
- **Vault**: `01_Projects/keigoly-jp/_Index.md`(プロジェクトカード)。セッション開始時に注入される。意味のある作業を終えたら「次の一手」を更新し、決定は `Decisions.md` に追記する。進行中タスクの動的状態は AIRFLOW board の `handoff_note`(`AI_Handoff.md` には書かない)。
- **機微クラス**: `public`(公開物。仕事用の境界は無い。ボードのタスクには `project:keigoly-jp` タグを付ける)。
- **連携型**: `none`(org/13 §6.5)。母艦のモジュールを import しない。母艦との境界は**なし**(母艦 `blog/analytics.py` の `keigoly.jp` はドメイン文字列のみ)。
- **母艦から借りるもの**: worktree 作成(`ai-context-engine/scripts/mac/new-worktree.sh`)・Air/mini 運用の前提(`ai-context-engine/docs/AIR_MINI_DEVOPS.md`)。それ以外の母艦コードには依存しない。
