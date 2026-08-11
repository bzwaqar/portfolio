import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ContactMessageCreate } from '@/types/api';
import { sendContactEmail } from '@/lib/email';

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

    // 1. Dispatch email notification to site owner
    let emailResult: { success: boolean; error?: string } = { success: false, error: 'Not attempted' };
    try {
      emailResult = await sendContactEmail({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      });
    } catch (e: any) {
      console.error('Email dispatch error in contact API:', e);
      emailResult = { success: false, error: e.message || String(e) };
    }

    // 2. Store message in MongoDB database if available
    let createdMessage = null;
    try {
      const db = await getDb();
      const newMessage = {
        ...body,
        created_at: new Date(),
        read: false,
      };
      const result = await db.collection('contact_messages').insertOne(newMessage);
      createdMessage = await db.collection('contact_messages').findOne({ _id: result.insertedId });
    } catch (dbErr) {
      console.warn('MongoDB save warning in contact API:', dbErr);
    }

    // If either email was sent OR message was saved in DB, return 201 success!
    if (emailResult.success || createdMessage) {
      return NextResponse.json(
        {
          success: true,
          message: 'Contact form received successfully.',
          email_sent: emailResult.success,
          email_error: emailResult.error || null,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: emailResult.error || 'Failed to process message' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Error in contact POST handler:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing contact message' },
      { status: 500 }
    );
  }
}
