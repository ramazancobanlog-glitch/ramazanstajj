import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Serves uploaded images stored in R2
// URL pattern: /api/admin/upload/heritage/<uuid>.<ext>
export async function GET(
  _req: Request,
  { params }: { params: { key: string[] } }
) {
  try {
    const { env } = getCloudflareContext();
    const bucket = env.IMAGES_BUCKET as R2Bucket | undefined;

    if (!bucket) {
      return NextResponse.json({ error: "R2 bucket not configured" }, { status: 500 });
    }

    const key = params.key.join("/");
    const object = await bucket.get(key);

    if (!object) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", object.httpMetadata?.contentType ?? "image/jpeg");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new NextResponse(object.body as ReadableStream, { headers });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
