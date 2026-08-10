import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { BlogPostCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published_only') === 'true';

    const db = await getDb();
    const query: any = {};
    if (publishedOnly) {
      query.published = true;
    }

    const posts = await db
      .collection('blog')
      .find(query)
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: BlogPostCreate = await request.json();
    const db = await getDb();

    const existing = await db.collection('blog').findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { detail: 'A blog post with this slug already exists.' },
        { status: 400 }
      );
    }

    const result = await db.collection('blog').insertOne(body);
    const createdPost = await db.collection('blog').findOne({ _id: result.insertedId });

    return NextResponse.json(createdPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
