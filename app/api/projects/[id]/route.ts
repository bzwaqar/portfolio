import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { ProjectUpdate } from '@/types/api';

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

    const project = await db.collection('projects').findOne(query);

    if (!project) {
      return NextResponse.json(
        { detail: `Project '${id}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
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
    const body: ProjectUpdate = await request.json();
    const db = await getDb();

    let queryFilter: any = { slug: id };
    if (ObjectId.isValid(id)) {
      queryFilter = { $or: [{ slug: id }, { _id: new ObjectId(id) }] };
    }

    const existingDoc = await db.collection('projects').findOne(queryFilter);
    if (!existingDoc) {
      return NextResponse.json(
        { detail: `Project '${id}' not found.` },
        { status: 404 }
      );
    }

    // Filter out undefined/null values
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

    await db.collection('projects').updateOne(
      { _id: existingDoc._id },
      { $set: updateDict }
    );

    const updatedProject = await db.collection('projects').findOne({ _id: existingDoc._id });
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    const result = await db.collection('projects').deleteOne(queryFilter);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { detail: 'Project not found.' },
        { status: 404 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
