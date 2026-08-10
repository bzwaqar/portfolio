import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ContactMessageCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const messages = await db
      .collection('contact_messages')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessageCreate = await request.json();
    const db = await getDb();

    const newMessage = {
      ...body,
      created_at: new Date(),
      read: false,
    };

    const result = await db.collection('contact_messages').insertOne(newMessage);
    const createdMessage = await db.collection('contact_messages').findOne({ _id: result.insertedId });

    return NextResponse.json(createdMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
