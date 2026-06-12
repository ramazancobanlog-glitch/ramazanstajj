import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json() as { username: string; password: string };

    // Read credentials from Cloudflare Worker secrets (set via wrangler secret put)
    // Falls back to env vars for local dev
    const { env } = getCloudflareContext();
    const adminUser = (env as any).ADMIN_USERNAME ?? "ramazan";
    const adminPass = (env as any).ADMIN_PASSWORD ?? "ramazan1627";

    if (username === adminUser && password === adminPass) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: "Hatalı kullanıcı adı veya şifre!" }, { status: 401 });
  } catch {
    return NextResponse.json({ ok: false, error: "Sunucu hatası" }, { status: 500 });
  }
}
