import { NextResponse } from "next/server";
import getDB from "@/lib/db";

export async function POST(req: Request) {
  try {
    const db = getDB();
    const data = await req.json() as any;
    const id = crypto.randomUUID();
    const { name, email, subject, message } = data;

    await db.prepare(
      "INSERT INTO contact_messages (id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)"
    ).bind(id, name, email, subject, message).run();

    return NextResponse.json({ id, name, email, subject, message, createdAt: new Date() });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
