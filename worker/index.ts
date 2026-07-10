/**
 * Cloudflare Worker: keigoly.jp ポータル。
 *
 * 役割は二つ:
 *   1. ポータル (dist/) の静的配信 — wrangler.toml の [assets] binding=ASSETS。
 *      アセットにマッチするリクエストは Worker より先に配信され、
 *      未マッチのみ本 Worker が走る。
 *   2. 旧 keigoly.jp (現 official.keigoly.jp) 時代の既存パスを 301 転送し、
 *      検索インデックス・被リンクを温存する。
 */

interface Fetcher {
  fetch(request: Request): Promise<Response>;
}
interface Env {
  ASSETS?: Fetcher;
}

const OFFICIAL_ORIGIN = "https://official.keigoly.jp";

// 旧ポートフォリオサイト由来のパス。完全一致 or "<prefix>/" 前方一致で転送。
const LEGACY_PREFIXES = [
  "/about",
  "/works",
  "/blog",
  "/contact",
  "/privacy",
  "/tokushoho",
  "/en",
  "/admin",
  "/images",
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    const isLegacy = LEGACY_PREFIXES.some(
      (prefix) => path === prefix || path.startsWith(prefix + "/"),
    );
    if (isLegacy) {
      return Response.redirect(OFFICIAL_ORIGIN + path + url.search, 301);
    }

    return env.ASSETS
      ? env.ASSETS.fetch(request)
      : new Response("Not found", { status: 404 });
  },
};
