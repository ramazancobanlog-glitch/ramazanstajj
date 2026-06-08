import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';

export async function GET() {

  try {
    await seedDatabase();
    return NextResponse.json({ message: 'Seeding completed' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
