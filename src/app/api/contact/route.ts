import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: Request) {

  try {
    await dbConnect();
    const data = await req.json();
    const newMessage = await ContactMessage.create(data);
    return NextResponse.json(newMessage);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
