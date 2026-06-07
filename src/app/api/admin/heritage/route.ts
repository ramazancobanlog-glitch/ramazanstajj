import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HeritageSite from "@/models/HeritageSite";

export async function GET() {
  try {
    await dbConnect();
    const sites = await HeritageSite.find({}).sort({ createdAt: -1 });
    return NextResponse.json(sites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newSite = await HeritageSite.create(data);
    return NextResponse.json(newSite);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, ...data } = await req.json();
    const updatedSite = await HeritageSite.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedSite);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");
    await HeritageSite.findByIdAndDelete(id);
    return NextResponse.json({ message: "Site deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
