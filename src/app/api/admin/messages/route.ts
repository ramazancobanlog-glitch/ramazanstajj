import { NextResponse } from "next/server";
import getDB from "@/lib/db";

export async function GET() {
  try {
    const db = getDB();
    const { results } = await db.prepare(
      "SELECT id as _id, name, email, subject, message, created_at as createdAt FROM contact_messages ORDER BY created_at DESC"
    ).all();
    return NextResponse.json(results);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const db = getDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");
    await db.prepare("DELETE FROM contact_messages WHERE id = ?").bind(id).run();
    return NextResponse.json({ message: "Message deleted" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
