import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { generateAiProjectDraft } from '@/lib/ai-service';

export async function POST(
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

    const project = await db.collection('projects').findOne(queryFilter);

    if (!project) {
      return NextResponse.json(
        { detail: `Project '${id}' not found.` },
        { status: 404 }
      );
    }

    const draft = await generateAiProjectDraft(
      project.name || project.slug || 'project',
      project.description || project.short_description || '',
      project.readme_content || '',
      project.languages || [],
      project.topics || []
    );

    return NextResponse.json({
      status: 'success',
      project_id: project._id.toString(),
      draft: draft,
    });
  } catch (error) {
    console.error('Error generating AI draft:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI draft' },
      { status: 500 }
    );
  }
}
