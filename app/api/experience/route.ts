import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ExperienceCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const experience = await db
      .collection('experience')
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ExperienceCreate = await request.json();
    const db = await getDb();

    const result = await db.collection('experience').insertOne(body);
    const created = await db.collection('experience').findOne({ _id: result.insertedId });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
