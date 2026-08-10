import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { CertificationCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const certs = await db
      .collection('certifications')
      .find({})
      .sort({ date_earned: -1 })
      .toArray();

    return NextResponse.json(certs);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CertificationCreate = await request.json();
    const db = await getDb();

    const result = await db.collection('certifications').insertOne(body);
    const created = await db.collection('certifications').findOne({ _id: result.insertedId });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json(
      { error: 'Failed to create certification' },
      { status: 500 }
    );
  }
}
