import { NextResponse } from "next/server";
import getDB from "@/lib/db";

export async function GET() {
  try {
    const db = getDB();
    const { results } = await db.prepare(
      "SELECT id as _id, id, name, description, location, country, image_url as imageUrl, category, year_listed as yearListed, created_at as createdAt, updated_at as updatedAt FROM heritage_sites ORDER BY created_at DESC"
    ).all();
    return NextResponse.json(results);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = getDB();
    const data = await req.json() as any;
    const id = data.id || data.name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove Turkish accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || crypto.randomUUID();
    
    const { name, description, location, country, imageUrl, category, yearListed } = data;

    await db.prepare(
      "INSERT INTO heritage_sites (id, name, description, location, country, image_url, category, year_listed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      id,
      name,
      description,
      location,
      country,
      imageUrl,
      category,
      Number(yearListed)
    ).run();

    return NextResponse.json({ _id: id, id, name, description, location, country, imageUrl, category, yearListed });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const db = getDB();
    const body = await req.json() as any;
    const { id, name, description, location, country, imageUrl, category, yearListed } = body;
    
    // In MongoDB, the id might come as _id. We check both.
    const siteId = id || body._id;

    await db.prepare(
      "UPDATE heritage_sites SET name = ?, description = ?, location = ?, country = ?, image_url = ?, category = ?, year_listed = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
    ).bind(
      name,
      description,
      location,
      country,
      imageUrl,
      category,
      Number(yearListed),
      siteId
    ).run();

    return NextResponse.json({ _id: siteId, id: siteId, name, description, location, country, imageUrl, category, yearListed });
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
    
    await db.prepare("DELETE FROM heritage_sites WHERE id = ?").bind(id).run();
    return NextResponse.json({ message: "Site deleted" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
