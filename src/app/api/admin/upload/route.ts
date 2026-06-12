import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function POST(req: Request) {
  try {
    const { env } = getCloudflareContext();
    const bucket = env.IMAGES_BUCKET as R2Bucket | undefined;

    if (!bucket) {
      return NextResponse.json(
        { error: "R2 image bucket not configured" },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const ext = file.name.split(".").pop() || "jpg";
    const key = `heritage/${crypto.randomUUID()}.${ext}`;

    await bucket.put(key, bytes, {
      httpMetadata: { contentType: file.type || "image/jpeg" },
    });

    // Public URL via the Worker's /r2/ path (served below) or direct R2 public domain
    const url = `/api/admin/upload/${key}`;

    return NextResponse.json({ url });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
