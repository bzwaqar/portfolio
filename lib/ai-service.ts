export function formatTitleFromName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(
      /\w\S*/g,
      (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export function extractFeaturesFromReadme(readme: string): string[] {
  if (!readme) return [];

  const features: string[] = [];
  const lines = readme.split('\n');

  for (const line of lines) {
    const cleaned = line.trim();
    if (/^[\*\-\+]\s+[A-Z0-9]/i.test(cleaned)) {
      let item = cleaned.replace(/^[\*\-\+]\s+/, '').trim();
      // Remove inline markdown links/formatting
      item = item.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
      item = item.replace(/\*\*/g, '').replace(/`/g, '').trim();

      if (item.length >= 10 && item.length <= 120 && !item.toLowerCase().startsWith('http')) {
        features.push(item);
      }
      if (features.length >= 6) {
        break;
      }
    }
  }

  return features;
}

export function extractProblemAndSolution(
  readme: string,
  description: string
): [string, string] {
  if (!readme && !description) {
    return [
      'Standard data processing or automation challenge.',
      'Engineered Python software solution.',
    ];
  }

  const problemMatch = readme.match(
    /(?:problem|challenge|motivation|background|overview)[:\s\n]+([^\n\.]+[\.\n])/i
  );
  const problemStatement = problemMatch
    ? problemMatch[1].trim()
    : `Addressing data engineering and model classification requirements for ${description || 'software automation'}.`;

  const solutionMatch = readme.match(
    /(?:solution|approach|architecture|implementation|methodology)[:\s\n]+([^\n\.]+[\.\n])/i
  );
  const solutionStatement = solutionMatch
    ? solutionMatch[1].trim()
    : `Built a modular codebase utilizing ${description || 'software engineering best practices'}.`;

  return [problemStatement, solutionStatement];
}

export async function generateAiProjectDraft(
  repoName: string,
  githubDescription: string,
  readmeContent: string,
  languages: string[],
  topics: string[]
) {
  console.log(`Generating AI Project Draft for repo: '${repoName}'...`);

  const formattedTitle = formatTitleFromName(repoName);
  const cleanDesc = (githubDescription || '').trim();

  // 1. Short Description
  const shortDesc = cleanDesc
    ? cleanDesc
    : `${formattedTitle} engineering project built with ${(languages || ['Python']).join(', ')}.`;

  // 2. Detailed Description
  let detailedDesc = '';
  if (readmeContent) {
    const paragraphs = readmeContent
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith('#'));

    detailedDesc = paragraphs.length > 0 ? paragraphs.slice(0, 2).join(' ') : shortDesc;
    detailedDesc = detailedDesc.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    detailedDesc = detailedDesc.replace(/\*\*/g, '').replace(/`/g, '').trim();
    if (detailedDesc.length > 400) {
      detailedDesc = detailedDesc.substring(0, 400) + '...';
    }
  } else {
    detailedDesc = `${shortDesc} Implemented as an open-source repository on GitHub with structured codebase organization.`;
  }

  // 3. Problem & Solution Extraction
  const [probStmt, solStmt] = extractProblemAndSolution(readmeContent, cleanDesc);

  // 4. Features Extraction
  let extractedFeatures = extractFeaturesFromReadme(readmeContent);
  if (!extractedFeatures || extractedFeatures.length === 0) {
    extractedFeatures = [
      `Modular code structure for ${repoName}`,
      `Implemented using ${languages && languages.length > 0 ? languages.join(', ') : 'Python'}`,
      'Clean version-controlled codebase with GitHub integration',
    ];
  }

  // 5. Verified Tech Stack Tags
  const allTech = new Set([...(languages || []), ...(topics || [])]);
  const readmeLower = (readmeContent || '').toLowerCase();
  const descLower = cleanDesc.toLowerCase();
  
  const knownTechs = [
    'pytorch', 'tensorflow', 'opencv', 'scikit-learn', 'pandas', 'numpy', 
    'fastapi', 'next.js', 'react', 'express', 'mongodb', 'docker', 'streamlit'
  ];

  for (const tech of knownTechs) {
    if (readmeLower.includes(tech) || descLower.includes(tech)) {
      if (tech === 'next.js') allTech.add('Next.js');
      else if (tech === 'scikit-learn') allTech.add('Scikit-learn');
      else if (tech === 'fastapi') allTech.add('FastAPI');
      else if (tech === 'pytorch') allTech.add('PyTorch');
      else if (tech === 'tensorflow') allTech.add('TensorFlow');
      else if (tech === 'opencv') allTech.add('OpenCV');
      else allTech.add(tech.charAt(0).toUpperCase() + tech.slice(1));
    }
  }

  const verifiedTechnologies = Array.from(allTech).sort();

  const draftResult = {
    title: formattedTitle,
    slug: repoName.toLowerCase(),
    short_description: shortDesc,
    description: detailedDesc,
    problem_statement: probStmt,
    solution_statement: solStmt,
    features: extractedFeatures,
    technologies: verifiedTechnologies,
  };

  console.log(`Successfully generated AI Draft for '${repoName}'.`);
  return draftResult;
}
