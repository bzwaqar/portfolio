export const GITHUB_API_BASE = 'https://api.github.com';

export function formatTitleFromName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export async function fetchGithubRepoReadme(
  username: string,
  repoName: string,
  headers: HeadersInit
): Promise<string> {
  const url = `${GITHUB_API_BASE}/repos/${username}/${repoName}/readme`;
  try {
    const response = await fetch(url, { headers, next: { revalidate: 3600 } });
    if (response.ok) {
      const data = await response.json();
      if (data.encoding === 'base64' && data.content) {
        return Buffer.from(data.content, 'base64').toString('utf-8');
      } else if (data.download_url) {
        const rawResp = await fetch(data.download_url, { next: { revalidate: 3600 } });
        if (rawResp.ok) {
          return await rawResp.text();
        }
      }
    }
    return '';
  } catch (error) {
    console.warn(`Could not fetch README for ${username}/${repoName}:`, error);
    return '';
  }
}

export async function fetchGithubUserRepos(username?: string): Promise<any[]> {
  const targetUsername = username || process.env.GITHUB_USERNAME || 'bzwaqar';
  const url = `${GITHUB_API_BASE}/users/${targetUsername}/repos?sort=updated&per_page=100`;

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'NextJS-Portfolio-App',
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  console.log(`Fetching GitHub repositories for user: '${targetUsername}'...`);

  try {
    const response = await fetch(url, { headers, cache: 'no-store' });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GitHub API error ${response.status}: ${text}`);
      return [];
    }

    const rawRepos = await response.json();
    const normalizedProjects = [];

    for (const repo of rawRepos) {
      const repoName = repo.name || '';
      if (!repoName) continue;

      const readmeText = await fetchGithubRepoReadme(targetUsername, repoName, headers);

      const primaryLang = repo.language;
      const languagesList = primaryLang ? [primaryLang] : [];

      const projectDoc = {
        github_id: repo.id,
        name: repoName,
        title: formatTitleFromName(repoName),
        slug: repoName.toLowerCase(),
        short_description: repo.description || 'GitHub repository project.',
        description: repo.description || 'GitHub repository project.',
        readme_content: readmeText,
        github_url: repo.html_url || `https://github.com/${targetUsername}/${repoName}`,
        demo_url: '',
        languages: languagesList,
        topics: repo.topics || [],
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        created_at: repo.created_at || '',
        updated_at: repo.updated_at || '',
        featured: false,
        published: false,
        images: [],
      };

      normalizedProjects.push(projectDoc);
    }

    console.log(`Successfully processed ${normalizedProjects.length} repositories for '${targetUsername}'.`);
    return normalizedProjects;
  } catch (error) {
    console.error('Failed to fetch repositories from GitHub API:', error);
    return [];
  }
}
