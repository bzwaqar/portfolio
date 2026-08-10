import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { BlogPostUpdate } from '@/types/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();

    let query: any = { slug: id };
    if (ObjectId.isValid(id)) {
      query = { $or: [{ slug: id }, { _id: new ObjectId(id) }] };
    }

    const post = await db.collection('blog').findOne(query);

    if (!post) {
      return NextResponse.json(
        { detail: `Blog post '${id}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: BlogPostUpdate = await request.json();
    const db = await getDb();

    let queryFilter: any = { slug: id };
    if (ObjectId.isValid(id)) {
      queryFilter = { $or: [{ slug: id }, { _id: new ObjectId(id) }] };
    }

    const existingDoc = await db.collection('blog').findOne(queryFilter);
    if (!existingDoc) {
      return NextResponse.json(
        { detail: `Blog post '${id}' not found.` },
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

    await db.collection('blog').updateOne(
      { _id: existingDoc._id },
      { $set: updateDict }
    );

    const updatedPost = await db.collection('blog').findOne({ _id: existingDoc._id });
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();

    let queryFilter: any = { slug: id };
    if (ObjectId.isValid(id)) {
      queryFilter = { $or: [{ slug: id }, { _id: new ObjectId(id) }] };
    }

    const result = await db.collection('blog').deleteOne(queryFilter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { detail: 'Blog post not found.' },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
