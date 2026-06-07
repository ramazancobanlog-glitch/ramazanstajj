import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newMessage = await ContactMessage.create(data);
    return NextResponse.json(newMessage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
