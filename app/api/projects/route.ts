import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ProjectCreate } from '@/types/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('published_only') === 'true';

    const db = await getDb();
    const query: any = {};

    if (publishedOnly) {
      query.published = true;
    }

    if (category && category.toLowerCase() !== 'all') {
      query.$or = [
        { category: category },
        { languages: category },
        { topics: category },
      ];
    }

    const projects = await db
      .collection('projects')
      .find(query)
      .sort({ featured: -1, updated_at: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProjectCreate = await request.json();
    const db = await getDb();

    // Check if project with slug already exists
    const existing = await db.collection('projects').findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { detail: 'A project with this slug already exists.' },
        { status: 400 }
      );
    }

    const result = await db.collection('projects').insertOne(body);
    const createdProject = await db.collection('projects').findOne({ _id: result.insertedId });

    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
