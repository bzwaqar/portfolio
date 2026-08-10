import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ProfileCreate, ProfileUpdate } from '@/types/api';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const profile = await db.collection('profile').findOne({});

    if (!profile) {
      return NextResponse.json(
        { detail: 'Profile not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProfileCreate = await request.json();
    const db = await getDb();

    // Check if a profile already exists
    const existing = await db.collection('profile').findOne({});
    if (existing) {
      return NextResponse.json(
        { detail: 'A profile already exists. Use PUT to update it.' },
        { status: 400 }
      );
    }

    const result = await db.collection('profile').insertOne(body);
    const createdProfile = await db.collection('profile').findOne({ _id: result.insertedId });

    return NextResponse.json(createdProfile, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: ProfileUpdate = await request.json();
    const db = await getDb();

    const existingDoc = await db.collection('profile').findOne({});
    if (!existingDoc) {
      return NextResponse.json(
        { detail: 'Profile not found.' },
        { status: 404 }
      );
    }

    const updateDict: any = {};
    for (const [key, value] of Object.entries(body)) {
      if (value !== undefined && value !== null) {
        updateDict[key] = value;
      }
    }

    if (Object.keys(updateDict).length === 0) {
      return NextResponse.json(
        { detail: 'No fields provided for update.' },
        { status: 400 }
      );
    }

    await db.collection('profile').updateOne(
      { _id: existingDoc._id },
      { $set: updateDict }
    );

    const updatedProfile = await db.collection('profile').findOne({ _id: existingDoc._id });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
