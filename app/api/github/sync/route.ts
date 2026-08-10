import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { fetchGithubUserRepos } from '@/lib/github-service';

export async function POST(request: NextRequest) {
  try {
    const targetUsername = process.env.GITHUB_USERNAME || 'bzwaqar';
    const repos = await fetchGithubUserRepos(targetUsername);

    if (!repos || repos.length === 0) {
      return NextResponse.json(
        { detail: `Could not fetch repositories for GitHub user '${targetUsername}'.` },
        { status: 500 }
      );
    }

    const db = await getDb();
    let syncedCount = 0;
    let updatedCount = 0;

    for (const repoData of repos) {
      repoData.synced_at = new Date();
      const githubId = repoData.github_id;
      const slug = repoData.slug;

      const queryFilter = { $or: [{ github_id: githubId }, { slug: slug }] };
      const existingDoc = await db.collection('projects').findOne(queryFilter);

      if (existingDoc) {
        const updateFields = {
          name: repoData.name,
          title: repoData.title,
          short_description: repoData.short_description,
          description: repoData.description,
          readme_content: repoData.readme_content,
          github_url: repoData.github_url,
          languages: repoData.languages,
          topics: repoData.topics,
          stars: repoData.stars,
          forks: repoData.forks,
          updated_at: repoData.updated_at,
          synced_at: repoData.synced_at,
        };
        await db.collection('projects').updateOne(
          { _id: existingDoc._id },
          { $set: updateFields }
        );
        updatedCount += 1;
      } else {
        await db.collection('projects').insertOne(repoData);
        syncedCount += 1;
      }
    }

    return NextResponse.json({
      status: 'success',
      message: 'GitHub repositories synced successfully to MongoDB Atlas collection \'projects\'.',
      username: targetUsername,
      new_projects_added: syncedCount,
      existing_projects_updated: updatedCount,
      total_projects: syncedCount + updatedCount,
    });
  } catch (error) {
    console.error('Error syncing GitHub repositories:', error);
    return NextResponse.json(
      { error: 'Failed to sync GitHub repositories' },
      { status: 500 }
    );
  }
}
