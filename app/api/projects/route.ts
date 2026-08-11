import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ProjectCreate } from '@/types/api';
import { fetchGitHubUserRepos, getProjectImage, getProjectDescription } from '@/lib/github';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const publishedOnly = searchParams.get('published_only') === 'true';

    try {
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

      if (projects && projects.length > 0) {
        return NextResponse.json(projects);
      }
    } catch (dbErr) {
      console.warn('MongoDB query warning in /api/projects, executing GitHub API fallback:', dbErr);
    }

    // Fallback: fetch live GitHub repositories
    const repos = await fetchGitHubUserRepos('bzwaqar');
    const normalized = repos.map((r) => {
      const img = getProjectImage(r);
      const desc = getProjectDescription(r);
      return {
        _id: String(r.github_id),
        github_id: r.github_id,
        name: r.name,
        title: r.name,
        slug: r.name.toLowerCase(),
        short_description: desc,
        description: desc,
        github_url: r.html_url,
        demo_url: r.demo_url,
        languages: [r.language],
        technologies: r.topics,
        topics: r.topics,
        stars: r.stargazers_count,
        forks: r.forks_count,
        image: img ? { url: img.url, alt: img.alt } : undefined,
        featured: true,
        published: true,
      };
    });

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 200 });
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
