# keigoly.jp ポータル — DEVELOPMENT.md

## 1. このディレクトリの役割

apex `keigoly.jp` のポータル(ゲートウェイ)サイト。official.keigoly.jp と claw.keigoly.jp への入口 1 ページと、旧ポートフォリオのパスを official へ 301 する Worker(`worker/index.ts`)を持つ。Astro・依存最小・main push で Cloudflare へ自動デプロイ。

## 2. 母艦連携(写し。正本は母艦の登録簿 `claw_bot/config/projects.json`)

| 項目 | 値 |
|---|---|
| slug | `keigoly-jp` |
| owner | 登録簿参照(非公開) |
| class | `public` |
| runtime | `none`(常駐なし。デプロイは GitHub Actions) |
| sync | `git`(mini `~/Developments/keigoly-jp` は `origin/main` の写し・`pull --ff-only`) |
| link(連携型) | `none`(母艦 `blog/analytics.py` の `keigoly.jp` はドメイン文字列のみ) |
| Discord | `#keigoly-jp` |
| Vault カード | `01_Projects/keigoly-jp/_Index.md` |
| data_dir(work のみ) | — |
| 母艦側アダプタ | — |

登録簿とこの表がずれたら登録簿を正とし、この表を直す。2026-09-03 に衛星として契約(S6)。

## 3. 現在の問題点

- なし(2026-09-03 時点)。Phase 4(任意)は未着手(母艦 memory `keigoly-jp-portal-restructure`)。

## 4. バグ修正時の手順(user CLAUDE.md 準拠・一気に直さない)

### Step 1: 調査とログ追加(見える化)
- `gh run list -R keigoly/keigoly-jp`(デプロイの成否)・`wrangler tail`(Worker のリダイレクト実測)・`npm run build`。
- 結果を確認してから Step 2 へ。

### Step 2: 原因箇所のみ最小限の改修
- 301 表(`worker/index.ts`)は消さない・減らさない。official 側にパスを足したらここにも足す。
- 結果を確認してから Step 3 へ。

### Step 3: 周辺の整合性確認と改修
- KeigolyOfficialSite とデザイントークン(`kg-` 色・フォント)を揃える。Vault カードの更新。
- 動作確認が終わるまで旧経路は残す。

## 5. 開発の作法

- 共有ディレクトリのため **新しいブランチは必ず専用 worktree** で(`/Users/Shared/Developments/ai-context-engine/scripts/mac/new-worktree.sh <branch>` を `REPO_ROOT=<この dir>` で呼ぶ)。正本は `main`。
- 母艦のコードを import しない。連携は無し。
- mini がリーダー(org/13 D9)。Lane B(git ff-only)で mini `~/Developments/keigoly-jp` に実在させる。Mutagen には乗せない。

## 6. 関連ドキュメント

- `CLAUDE.md`(設計原則・デプロイ・経緯)・`README.md`
- 母艦: `ai-context-engine/org/13-satellite-projects.md`・Vault カード `01_Projects/keigoly-jp/_Index.md`・決定事項 `Decisions.md`
