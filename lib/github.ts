/**
 * ============================================================================
 * GITHUB API CLIENT HELPER & IMAGE MAPPER (lib/github.ts) - PHASE 3.5 FIX
 * ============================================================================
 * Student Note:
 * Provides bulletproof image matching for public projects whether loaded from
 * FastAPI MongoDB backend, GitHub REST API, or offline fallback.
 */

export interface GitHubRepository {
  github_id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  is_fork: boolean;
  updated_at: string;
  image_url?: string;
  image_alt?: string;
  demo_url?: string;
}

export const PROJECT_IMAGE_MAP: Record<string, { url: string; alt: string }> = {
  'ai-artwork-retrieval': {
    url: '/images/projects/ai-artwork-retrieval.webp',
    alt: 'AI Artwork Retrieval project preview',
  },
  'ai-tech-stack-recommender': {
    url: '/images/projects/ai-tech-stack-recommender.webp',
    alt: 'AI Tech Stack Recommender project preview',
  },
  'amazon-review-intelligence': {
    url: '/images/projects/amazon-review-intelligence.webp',
    alt: 'Amazon Review Intelligence project preview',
  },
  'breast_cancer_prediction': {
    url: '/images/projects/breast_cancer_prediction.webp',
    alt: 'Breast Cancer Prediction ML project preview',
  },
  'breast-cancer-prediction': {
    url: '/images/projects/breast_cancer_prediction.webp',
    alt: 'Breast Cancer Prediction ML project preview',
  },
  'ocr-vision-pipeline': {
    url: '/images/projects/ocr-vision-pipeline.webp',
    alt: 'OCR Vision Pipeline project preview',
  },
  'pixsearch': {
    url: '/images/projects/artificial-intelligence-computer-vision-image-search.webp',
    alt: 'AI image search and computer vision project',
  },
  'credit-card-fraud-detection': {
    url: '/images/projects/credit-card-fraud-cybersecurity-digital-payment.webp',
    alt: 'Credit card fraud detection and cybersecurity concept',
  },
  'fifa-match-predictor-ai': {
    url: '/images/projects/fifa-match-prediction.webp',
    alt: 'Football match analytics and prediction project',
  },
  'facial_recognition_attendance': {
    url: '/images/projects/facial-recognition-security-camera-technology.webp',
    alt: 'Facial recognition and biometric security technology',
  },
  'ai-bookstore-fullstack': {
    url: '/images/projects/online-bookstore-technology-books-computer.webp',
    alt: 'Online bookstore software application concept',
  },
  'books-toscrape-web-scraper': {
    url: '/images/projects/web-scraping-programming-data-extraction.webp',
    alt: 'Web scraping and automated data extraction project',
  },
  'retailpulse-exploratory-data-analysis-business-insights': {
    url: '/images/projects/business-analytics-dashboard-data-visualization.webp',
    alt: 'Retail business data analytics and visualization',
  },
  'kmeans-hierarchical-customer-segmentation': {
    url: '/images/projects/customer-analytics-business-data-segmentation.webp',
    alt: 'Customer analytics and business data segmentation',
  },
  'social-media-engagement-clustering-application': {
    url: '/images/projects/social-media-engagement-clustering.webp',
    alt: 'Social media engagement analytics and data clustering',
  },
  'bbc-news-advanced-nlp': {
    url: '/images/projects/news-media-artificial-intelligence-natural-language-processing.webp',
    alt: 'Natural language processing and news media analytics',
  },
  'knn-data-classification-pipeline': {
    url: '/images/projects/software-developer-technology-programming-artificial-intelligence.webp',
    alt: 'Machine learning data classification pipeline',
  },
  'supportdesk': {
    url: '/images/projects/support-desk.webp',
    alt: 'Support desk and automated document processing system',
  },
  'business-data-semantic-intelligence-pipeline': {
    url: '/images/projects/business-intelligence-data-analytics-artificial-intelligence.webp',
    alt: 'Business intelligence and semantic data analytics',
  },
  'steel-energy-fastapi-pca': {
    url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    alt: 'Industrial data analytics and energy consumption analysis',
  },
  'steel-industry-energy-consumption-analysis-and-modeling': {
    url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    alt: 'Industrial data analytics and energy consumption analysis',
  },
  'diabetes-risk-prediction-system-': {
    url: '/images/projects/healthcare-data-analysis-artificial-intelligence.webp',
    alt: 'Healthcare data analysis and medical artificial intelligence',
  },
};

export const PROJECT_DESCRIPTION_MAP: Record<string, string> = {
  'fifa-match-predictor-ai':
    'AI-powered sports analytics engine using Machine Learning to evaluate team metrics, historical performance, and head-to-head statistics for predicting FIFA match outcomes.',
  'fifa':
    'AI-powered sports analytics engine using Machine Learning to evaluate team metrics, historical performance, and head-to-head statistics for predicting FIFA match outcomes.',
};

export function getProjectDescription(project: any): string {
  if (!project) return 'Software project built with modern technology.';
  const name = (project.name || project.title || project.slug || '').toLowerCase();
  if (name.includes('fifa')) {
    return PROJECT_DESCRIPTION_MAP['fifa-match-predictor-ai'];
  }
  const rawDesc = project.short_description || project.description;
  if (
    rawDesc &&
    rawDesc !== 'No description provided.' &&
    rawDesc !== 'GitHub project.' &&
    rawDesc !== 'GitHub repository project.'
  ) {
    return rawDesc;
  }
  const slug = (project.slug || project.name || '').toLowerCase().trim();
  if (PROJECT_DESCRIPTION_MAP[slug]) {
    return PROJECT_DESCRIPTION_MAP[slug];
  }
  return rawDesc || 'Software project built with modern technology.';
}

export function getProjectImage(project: any): { url: string; alt: string } | null {
  if (!project) return null;

  // 1. Check direct image object
  if (project.image && typeof project.image === 'object' && project.image.url) {
    return { url: project.image.url, alt: project.image.alt || `${project.title || project.name} project` };
  }
  if (project.image && typeof project.image === 'string') {
    return { url: project.image, alt: `${project.title || project.name} project` };
  }

  // 2. Check images array
  if (Array.isArray(project.images) && project.images.length > 0) {
    const first = project.images[0];
    if (typeof first === 'string') return { url: first, alt: `${project.title || project.name} project` };
    if (typeof first === 'object' && first.url) return { url: first.url, alt: first.alt || `${project.title || project.name} project` };
  }

  // 3. Match by slug / name in fallback map
  const rawSlug = (project.slug || project.name || '').toLowerCase().trim();
  const normalizedSlug = rawSlug.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  if (PROJECT_IMAGE_MAP[rawSlug]) {
    return PROJECT_IMAGE_MAP[rawSlug];
  }
  if (PROJECT_IMAGE_MAP[normalizedSlug]) {
    return PROJECT_IMAGE_MAP[normalizedSlug];
  }

  for (const [key, val] of Object.entries(PROJECT_IMAGE_MAP)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (
      rawSlug === key ||
      normalizedSlug === normalizedKey ||
      normalizedSlug.includes(normalizedKey) ||
      normalizedKey.includes(normalizedSlug)
    ) {
      return val;
    }
  }

  return null;
}

export async function fetchGitHubUserRepos(username: string = 'bzwaqar'): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    if (response.ok) {
      const rawRepos = await response.json();
      if (Array.isArray(rawRepos) && rawRepos.length > 0) {
        return rawRepos
          .filter((repo: any) => !repo.fork && repo.name.toLowerCase() !== 'portfolio')
          .map((repo: any) => {
            const img = getProjectImage(repo);
            const desc = getProjectDescription(repo);
            return {
              github_id: repo.id,
              name: repo.name,
              full_name: repo.full_name,
              html_url: repo.html_url,
              description: desc,
              language: repo.language || 'Python',
              stargazers_count: repo.stargazers_count || 0,
              forks_count: repo.forks_count || 0,
              topics: repo.topics || [],
              is_fork: repo.fork || false,
              updated_at: repo.updated_at || new Date().toISOString(),
              image_url: img?.url,
              image_alt: img?.alt,
            };
          });
      }
    }
  } catch (error) {
    console.warn('GitHub API fetch failed or rate-limited, utilizing fallback repositories:', error);
  }

  return getFallbackRepositories(username);
}

function getFallbackRepositories(username: string): GitHubRepository[] {
  return [
    {
      github_id: 101,
      name: 'fifa-match-predictor-ai',
      full_name: `${username}/fifa-match-predictor-ai`,
      html_url: `https://github.com/${username}/fifa-match-predictor-ai`,
      description: 'AI-powered sports analytics engine using Machine Learning to evaluate team metrics, historical performance, and head-to-head statistics for predicting FIFA match outcomes.',
      language: 'Python',
      stargazers_count: 12,
      forks_count: 4,
      topics: ['machine-learning', 'python', 'scikit-learn', 'xgboost', 'fifa'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/fifa-match-prediction.webp',
      image_alt: 'Football match analytics and prediction project',
    },
    {
      github_id: 102,
      name: 'SupportDesk',
      full_name: `${username}/SupportDesk`,
      html_url: `https://github.com/${username}/SupportDesk`,
      description: 'Automated support desk system built with Python for ticket routing, document scanning, and intelligent customer request resolution.',
      language: 'Python',
      stargazers_count: 5,
      forks_count: 1,
      topics: ['helpdesk', 'python', 'automation', 'support-desk'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/support-desk.webp',
      image_alt: 'Support desk and automated document processing system',
    },
    {
      github_id: 103,
      name: 'ai-artwork-retrieval',
      full_name: `${username}/ai-artwork-retrieval`,
      html_url: `https://github.com/${username}/ai-artwork-retrieval`,
      description: 'Deep learning multi-modal search engine retrieving relevant artworks using visual feature extraction and vector embeddings.',
      language: 'Python',
      stargazers_count: 10,
      forks_count: 2,
      topics: ['deep-learning', 'computer-vision', 'art-retrieval', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/ai-artwork-retrieval.webp',
      image_alt: 'AI Artwork Retrieval project preview',
    },
    {
      github_id: 104,
      name: 'AI-Tech-Stack-Recommender',
      full_name: `${username}/AI-Tech-Stack-Recommender`,
      html_url: `https://github.com/${username}/AI-Tech-Stack-Recommender`,
      description: 'Intelligent recommendation engine evaluating project parameters to suggest optimal software architecture and tech stacks.',
      language: 'Python',
      stargazers_count: 7,
      forks_count: 1,
      topics: ['ai-recommender', 'python', 'tech-stack', 'machine-learning'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/ai-tech-stack-recommender.webp',
      image_alt: 'AI Tech Stack Recommender project preview',
    },
    {
      github_id: 105,
      name: 'Amazon-Review-Intelligence',
      full_name: `${username}/Amazon-Review-Intelligence`,
      html_url: `https://github.com/${username}/Amazon-Review-Intelligence`,
      description: 'Natural language processing and sentiment classification pipeline analyzing customer feedback and review analytics at scale.',
      language: 'Python',
      stargazers_count: 15,
      forks_count: 5,
      topics: ['nlp', 'sentiment-analysis', 'amazon-reviews', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/amazon-review-intelligence.webp',
      image_alt: 'Amazon Review Intelligence project preview',
    },
    {
      github_id: 106,
      name: 'Breast_cancer_prediction',
      full_name: `${username}/Breast_cancer_prediction`,
      html_url: `https://github.com/${username}/Breast_cancer_prediction`,
      description: 'Diagnostic machine learning classification model analyzing clinical patient attributes to predict breast cancer risks accurately.',
      language: 'Python',
      stargazers_count: 9,
      forks_count: 2,
      topics: ['healthcare', 'machine-learning', 'cancer-prediction', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/breast_cancer_prediction.webp',
      image_alt: 'Breast Cancer Prediction ML project preview',
    },
    {
      github_id: 107,
      name: 'OCR-Vision-Pipeline',
      full_name: `${username}/OCR-Vision-Pipeline`,
      html_url: `https://github.com/${username}/OCR-Vision-Pipeline`,
      description: 'Computer vision text recognition pipeline processing document imagery, optical character scanning, and structured data extraction.',
      language: 'Python',
      stargazers_count: 8,
      forks_count: 3,
      topics: ['ocr', 'computer-vision', 'tesseract', 'opencv', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/ocr-vision-pipeline.webp',
      image_alt: 'OCR Vision Pipeline project preview',
    },
    {
      github_id: 108,
      name: 'PixSearch',
      full_name: `${username}/PixSearch`,
      html_url: `https://github.com/${username}/PixSearch`,
      description: 'Real-time visual image search engine utilizing convolutional neural networks for feature extraction and similarity indexing.',
      language: 'Python',
      stargazers_count: 14,
      forks_count: 4,
      topics: ['image-search', 'computer-vision', 'pytorch', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/artificial-intelligence-computer-vision-image-search.webp',
      image_alt: 'AI image search and computer vision project',
    },
    {
      github_id: 109,
      name: 'Credit-Card-Fraud-Detection',
      full_name: `${username}/Credit-Card-Fraud-Detection`,
      html_url: `https://github.com/${username}/Credit-Card-Fraud-Detection`,
      description: 'Financial anomaly detection system training supervised machine learning algorithms to identify fraudulent transaction patterns.',
      language: 'Python',
      stargazers_count: 11,
      forks_count: 3,
      topics: ['fraud-detection', 'cybersecurity', 'scikit-learn', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/credit-card-fraud-cybersecurity-digital-payment.webp',
      image_alt: 'Credit card fraud detection and cybersecurity concept',
    },
    {
      github_id: 110,
      name: 'facial_recognition_attendance',
      full_name: `${username}/facial_recognition_attendance`,
      html_url: `https://github.com/${username}/facial_recognition_attendance`,
      description: 'Real-time biometric attendance tracker leveraging OpenCV and facial landmark verification algorithms for secure identification.',
      language: 'Python',
      stargazers_count: 13,
      forks_count: 4,
      topics: ['facial-recognition', 'opencv', 'biometrics', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/facial-recognition-security-camera-technology.webp',
      image_alt: 'Facial recognition and biometric security technology',
    },
    {
      github_id: 111,
      name: 'ai-bookstore-fullstack',
      full_name: `${username}/ai-bookstore-fullstack`,
      html_url: `https://github.com/${username}/ai-bookstore-fullstack`,
      description: 'End-to-end e-commerce online bookstore featuring personalized AI recommendations, cart checkout, and REST backend.',
      language: 'TypeScript',
      stargazers_count: 16,
      forks_count: 5,
      topics: ['bookstore', 'fullstack', 'react', 'nextjs', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/online-bookstore-technology-books-computer.webp',
      image_alt: 'Online bookstore software application concept',
    },
    {
      github_id: 112,
      name: 'books-toscrape-web-scraper',
      full_name: `${username}/books-toscrape-web-scraper`,
      html_url: `https://github.com/${username}/books-toscrape-web-scraper`,
      description: 'Scalable web scraper extracting catalog items, pricing tiers, and inventory data into structured databases automatically.',
      language: 'Python',
      stargazers_count: 6,
      forks_count: 1,
      topics: ['web-scraping', 'beautifulsoup', 'data-extraction', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/web-scraping-programming-data-extraction.webp',
      image_alt: 'Web scraping and automated data extraction project',
    },
    {
      github_id: 113,
      name: 'RetailPulse-Exploratory-Data-Analysis-Business-Insights',
      full_name: `${username}/RetailPulse-Exploratory-Data-Analysis-Business-Insights`,
      html_url: `https://github.com/${username}/RetailPulse-Exploratory-Data-Analysis-Business-Insights`,
      description: 'Exploratory data analysis notebook uncovering retail trends, revenue metrics, customer cohorts, and executive business insights.',
      language: 'Jupyter Notebook',
      stargazers_count: 7,
      forks_count: 2,
      topics: ['eda', 'retail-analytics', 'pandas', 'data-visualization'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/business-analytics-dashboard-data-visualization.webp',
      image_alt: 'Retail business data analytics and visualization',
    },
    {
      github_id: 114,
      name: 'kmeans-hierarchical-customer-segmentation',
      full_name: `${username}/kmeans-hierarchical-customer-segmentation`,
      html_url: `https://github.com/${username}/kmeans-hierarchical-customer-segmentation`,
      description: 'Unsupervised machine learning application grouping customer profiles using K-Means and Hierarchical Clustering algorithms.',
      language: 'Python',
      stargazers_count: 9,
      forks_count: 2,
      topics: ['clustering', 'kmeans', 'customer-segmentation', 'scikit-learn'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/customer-analytics-business-data-segmentation.webp',
      image_alt: 'Customer analytics and business data segmentation',
    },
    {
      github_id: 115,
      name: 'Social-Media-Engagement-Clustering-Application',
      full_name: `${username}/Social-Media-Engagement-Clustering-Application`,
      html_url: `https://github.com/${username}/Social-Media-Engagement-Clustering-Application`,
      description: 'Data analytics pipeline categorizing user engagement metrics, post reach, and interaction clusters across social platforms.',
      language: 'Python',
      stargazers_count: 8,
      forks_count: 2,
      topics: ['social-media', 'clustering', 'analytics', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/social-media-engagement-clustering.webp',
      image_alt: 'Social media engagement analytics and data clustering',
    },
    {
      github_id: 116,
      name: 'bbc-news-advanced-nlp',
      full_name: `${username}/bbc-news-advanced-nlp`,
      html_url: `https://github.com/${username}/bbc-news-advanced-nlp`,
      description: 'Natural language processing text classification system categorizing news articles into domain topics using TF-IDF and NLP models.',
      language: 'Python',
      stargazers_count: 12,
      forks_count: 3,
      topics: ['nlp', 'bbc-news', 'text-classification', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/news-media-artificial-intelligence-natural-language-processing.webp',
      image_alt: 'Natural language processing and news media analytics',
    },
    {
      github_id: 117,
      name: 'KNN-Data-Classification-Pipeline',
      full_name: `${username}/KNN-Data-Classification-Pipeline`,
      html_url: `https://github.com/${username}/KNN-Data-Classification-Pipeline`,
      description: 'K-Nearest Neighbors classification engine performing dataset normalization, hyperparameter tuning, and decision surface evaluation.',
      language: 'Python',
      stargazers_count: 6,
      forks_count: 1,
      topics: ['knn', 'classification', 'scikit-learn', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/software-developer-technology-programming-artificial-intelligence.webp',
      image_alt: 'Machine learning data classification pipeline',
    },
    {
      github_id: 118,
      name: 'Business-Data-Semantic-Intelligence-Pipeline',
      full_name: `${username}/Business-Data-Semantic-Intelligence-Pipeline`,
      html_url: `https://github.com/${username}/Business-Data-Semantic-Intelligence-Pipeline`,
      description: 'Enterprise data intelligence pipeline transforming raw business feeds into structured semantic analytics and knowledge graphs.',
      language: 'Python',
      stargazers_count: 11,
      forks_count: 3,
      topics: ['semantic-ai', 'data-pipeline', 'business-intelligence', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/business-intelligence-data-analytics-artificial-intelligence.webp',
      image_alt: 'Business intelligence and semantic data analytics',
    },
    {
      github_id: 119,
      name: 'Steel-Industry-Energy-Consumption-Analysis-and-Modeling',
      full_name: `${username}/Steel-Industry-Energy-Consumption-Analysis-and-Modeling`,
      html_url: `https://github.com/${username}/Steel-Industry-Energy-Consumption-Analysis-and-Modeling`,
      description: 'Industrial predictive modeling analyzing energy consumption, power usage variables, and operational load metrics.',
      language: 'Python',
      stargazers_count: 7,
      forks_count: 2,
      topics: ['energy-analytics', 'predictive-modeling', 'industrial-ai', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
      image_alt: 'Industrial data analytics and energy consumption analysis',
    },
    {
      github_id: 120,
      name: 'steel-energy-fastapi-pca',
      full_name: `${username}/steel-energy-fastapi-pca`,
      html_url: `https://github.com/${username}/steel-energy-fastapi-pca`,
      description: 'Principal Component Analysis (PCA) dimensionality reduction service served via REST API endpoints for real-time energy insights.',
      language: 'Python',
      stargazers_count: 8,
      forks_count: 2,
      topics: ['pca', 'fastapi', 'dimensionality-reduction', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
      image_alt: 'Industrial data analytics and energy consumption analysis',
    },
    {
      github_id: 121,
      name: 'Diabetes-Risk-Prediction-System-',
      full_name: `${username}/Diabetes-Risk-Prediction-System-`,
      html_url: `https://github.com/${username}/Diabetes-Risk-Prediction-System-`,
      description: 'Machine learning clinical decision support system forecasting diabetes risk factors from health diagnostics and lab indicators.',
      language: 'Python',
      stargazers_count: 10,
      forks_count: 3,
      topics: ['healthcare-ai', 'diabetes-prediction', 'machine-learning', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/healthcare-data-analysis-artificial-intelligence.webp',
      image_alt: 'Healthcare data analysis and medical artificial intelligence',
    },
  ];
}

