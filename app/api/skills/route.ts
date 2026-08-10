import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { SkillCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const skills = await db
      .collection('skills')
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SkillCreate = await request.json();
    const db = await getDb();

    const result = await db.collection('skills').insertOne(body);
    const created = await db.collection('skills').findOne({ _id: result.insertedId });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
