import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { EducationCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const education = await db
      .collection('education')
      .find({})
      .sort({ _id: -1 }) // Sort arbitrarily or by date if a field exists
      .toArray();

    return NextResponse.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: EducationCreate = await request.json();
    const db = await getDb();

    const result = await db.collection('education').insertOne(body);
    const created = await db.collection('education').findOne({ _id: result.insertedId });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
