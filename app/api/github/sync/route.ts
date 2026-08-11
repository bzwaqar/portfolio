import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { fetchGitHubUserRepos, getProjectDescription } from '@/lib/github';

export async function POST(request: NextRequest) {
  try {
    const targetUsername = process.env.GITHUB_USERNAME || 'bzwaqar';
    const repos = await fetchGitHubUserRepos(targetUsername);

    if (!repos || repos.length === 0) {
      return NextResponse.json(
        { detail: `Could not fetch repositories for GitHub user '${targetUsername}'.` },
        { status: 400 }
      );
    }

    try {
      const db = await getDb();
      let syncedCount = 0;
      let updatedCount = 0;

      for (const repoData of repos) {
        const githubId = repoData.github_id;
        const slug = repoData.name.toLowerCase();
        const desc = getProjectDescription(repoData);

        const queryFilter = { $or: [{ github_id: githubId }, { slug: slug }] };
        const existingDoc = await db.collection('projects').findOne(queryFilter);

        const updateFields = {
          name: repoData.name,
          title: repoData.name,
          slug: slug,
          short_description: desc,
          description: desc,
          github_url: repoData.html_url,
          demo_url: repoData.demo_url || '',
          languages: [repoData.language],
          topics: repoData.topics,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          updated_at: new Date(),
          synced_at: new Date(),
          published: true,
        };

        if (existingDoc) {
          await db.collection('projects').updateOne(
            { _id: existingDoc._id },
            { $set: updateFields }
          );
          updatedCount += 1;
        } else {
          await db.collection('projects').insertOne(updateFields);
          syncedCount += 1;
        }
      }

      return NextResponse.json({
        status: 'success',
        message: 'GitHub repositories synced successfully.',
        username: targetUsername,
        new_projects_added: syncedCount,
        existing_projects_updated: updatedCount,
        total_projects: syncedCount + updatedCount,
      });
    } catch (dbErr: any) {
      console.warn('MongoDB sync warning in /api/github/sync:', dbErr);
      return NextResponse.json({
        status: 'partial_success',
        message: 'GitHub repositories fetched successfully (MongoDB update pending).',
        total_repos: repos.length,
      });
    }
  } catch (error: any) {
    console.error('Error syncing GitHub repositories:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to sync GitHub repositories' },
      { status: 500 }
    );
  }
}
