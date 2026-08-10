import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ServiceCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const services = await db
      .collection('services')
      .find({})
      .sort({ _id: -1 })
      .toArray();

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ServiceCreate = await request.json();
    const db = await getDb();

    const result = await db.collection('services').insertOne(body);
    const created = await db.collection('services').findOne({ _id: result.insertedId });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
