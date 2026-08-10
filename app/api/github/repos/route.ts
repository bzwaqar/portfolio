import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { fetchGithubUserRepos } from '@/lib/github-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || undefined;

    const liveRepos = await fetchGithubUserRepos(username);
    if (liveRepos && liveRepos.length > 0) {
      return NextResponse.json(liveRepos);
    }

    // Fallback to projects in MongoDB Atlas
    const db = await getDb();
    const cachedProjects = await db
      .collection('projects')
      .find()
      .sort({ stars: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(cachedProjects);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}
