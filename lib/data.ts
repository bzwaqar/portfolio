/**
 * ============================================================================
 * PORTFOLIO DATA STORE (lib/data.ts) - PHASE 2 (Authoritative Source of Truth)
 * ============================================================================
 * Student & Developer Note:
 * This file serves as the SINGLE SOURCE OF TRUTH for Waqar Khan's personal profile,
 * contact details, education, certifications, technical skills matrix, and work history.
 * All frontend components consume this data directly, enabling straightforward edits.
 */

// ----------------------------------------------------------------------------
// Type Definitions
// ----------------------------------------------------------------------------

export interface PersonalInfo {
  name: string;
  primaryTitle: string;
  secondaryTitle: string;
  specialization: string;
  bio: string;
  longBio: string[];
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  profileImage: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  location: string;
  details: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'On-Site' | 'Remote' | 'Hybrid';
  responsibilities: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  editableNote: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  solution: string;
  features: string[];
  technologies: string[];
  architectureSummary: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  image: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    heading: string;
    paragraph: string;
  }[];
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
  featured: boolean;
  image: string;
}

// ----------------------------------------------------------------------------
// Authoritative Personal Profile
// ----------------------------------------------------------------------------

export const personalInfo: PersonalInfo = {
  name: 'Waqar Khan',
  primaryTitle: 'Machine Learning Engineer',
  secondaryTitle: 'Full Stack Engineer',
  specialization: 'Computer Vision Enthusiast',
  bio: 'Machine Learning Engineer and Full Stack Engineer with experience in AI-driven applications, Computer Vision, Generative AI, and modern web development. Professional focus includes building intelligent systems and integrating AI capabilities into full-stack applications.',
  longBio: [
    'I am a Machine Learning Engineer and Full Stack Engineer based in Islamabad, Pakistan, specializing in Artificial Intelligence, Computer Vision, and modern web application development.',
    'My technical work centers on building intelligent systems, applying Deep Learning and Generative AI, crafting Retrieval-Augmented Generation (RAG) pipelines, and integrating robust AI backends with modern full-stack web applications.',
    'Currently pursuing my Bachelor of Science in Artificial Intelligence at COMSATS University Islamabad (2024 – Present), I bring practical experience from industry software engineering and machine learning internships.'
  ],
  location: 'Islamabad, Pakistan',
  email: 'bbzwaqar@gmail.com',
  phone: '0343-0577768',
  github: 'https://github.com/bzwaqar',
  linkedin: 'https://linkedin.com/in/waqar-khan-9a7016321',
  profileImage: '/images/profile/waqar.webp'
};

// ----------------------------------------------------------------------------
// Education Credentials
// ----------------------------------------------------------------------------

export const educationData: Education[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Science in Artificial Intelligence',
    institution: 'COMSATS University Islamabad',
    duration: '2024 – Present',
    location: 'Islamabad, Pakistan',
    details: 'Focusing on Machine Learning, Deep Learning, Computer Vision, Generative AI, Data Structures, Algorithms, and Software Engineering principles.'
  }
];

// ----------------------------------------------------------------------------
// Certifications & Credentials
// ----------------------------------------------------------------------------

export const certificationsData: Certification[] = [
  {
    id: 'cert-1',
    title: 'Agentic AI Bootcamp',
    issuer: 'COMSATS University Islamabad'
  },
  {
    id: 'cert-2',
    title: 'Beyond Chatbots: The Age of AI Agents',
    issuer: 'Youth Insight'
  },
  {
    id: 'cert-3',
    title: 'Python Essentials for MLOps',
    issuer: 'Duke University',
    platform: 'Coursera'
  },
  {
    id: 'cert-4',
    title: 'AI for Everyone',
    issuer: 'DeepLearning.AI',
    platform: 'Coursera'
  },
  {
    id: 'cert-5',
    title: 'Social Media & Digital Marketing',
    issuer: 'ILC COMSATS'
  }
];

// ----------------------------------------------------------------------------
// Professional Work Experience (Exact Facts)
// ----------------------------------------------------------------------------

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full Stack Engineer Intern',
    company: 'Sectem Technologies',
    location: 'On-Site',
    period: 'Jul 2026 – Present',
    type: 'On-Site',
    responsibilities: [
      'Developing full-stack applications using React.js, Node.js, MongoDB, and REST APIs.',
      'Integrating AI-powered automation into modern web solutions.',
      'Collaborating on scalable software development.'
    ]
  },
  {
    id: 'exp-2',
    role: 'Machine Learning Intern',
    company: 'ITSimplera',
    location: 'Remote',
    period: 'Jul 2026 – Aug 2026',
    type: 'Remote',
    responsibilities: [
      'Worked on Machine Learning and Generative AI projects.',
      'Applied Python, TensorFlow, and Scikit-learn on real-world datasets.'
    ]
  },
  {
    id: 'exp-3',
    role: 'Artificial Intelligence Intern',
    company: 'Decode Labs',
    location: 'Hybrid',
    period: 'Jun 2026 – Jul 2026',
    type: 'Hybrid',
    responsibilities: [
      'Developed AI solutions through mentor-guided Machine Learning projects.',
      'Collaborated in Agile teams and delivered project milestones.'
    ]
  },
  {
    id: 'exp-4',
    role: 'Machine Learning Intern',
    company: 'Arch Technologies Pakistan',
    location: 'Pakistan',
    period: 'Dec 2025 – Jan 2026',
    type: 'On-Site',
    responsibilities: [
      'Built ML models using preprocessing and feature engineering.',
      'Improved prediction accuracy through experimentation.'
    ]
  },
  {
    id: 'exp-5',
    role: 'Devstranaut 3.0 (Campus Ambassador)',
    company: 'Devsinc',
    location: 'COMSATS University Islamabad',
    period: '2026 – 2027',
    type: 'On-Site',
    responsibilities: [
      'Representing Devsinc as the official Campus Ambassador at COMSATS University Islamabad (Batch 2026–2027).',
      'Organizing technical workshops, developer meetups, and hackathons to foster software engineering culture.',
      'Serving as a liaison between Devsinc engineering initiatives and student developer communities on campus.'
    ]
  }
];

// ----------------------------------------------------------------------------
// Structured Technical Skills Matrix
// ----------------------------------------------------------------------------

export const skillCategoriesData: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Languages used for core algorithms, model engineering, and web development.',
    skills: ['Python', 'Java', 'JavaScript', 'C++']
  },
  {
    title: 'AI & Machine Learning',
    description: 'Core artificial intelligence paradigms, models, and analytical methods.',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Generative AI',
      'LLMs',
      'Retrieval-Augmented Generation (RAG)',
      'Feature Engineering',
      'Predictive Analytics',
      'Data Analysis'
    ]
  },
  {
    title: 'Computer Vision',
    description: 'Advanced visual intelligence, real-time object detection, image segmentation, and deep neural vision pipelines.',
    skills: [
      'OpenCV',
      'Object Detection',
      'Image Segmentation',
      'YOLO',
      'Facial Recognition',
      'PyTorch Vision',
      'Feature Extraction',
      'Convolutional Neural Networks (CNNs)'
    ]
  },
  {
    title: 'Web Development',
    description: 'Frontend and backend web technologies for building full-stack applications.',
    skills: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'HTML', 'CSS', 'JavaScript']
  },
  {
    title: 'Libraries / Frameworks',
    description: 'Scientific computing, data manipulation, machine learning, and computer vision toolkits.',
    skills: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'Matplotlib']
  },
  {
    title: 'Databases',
    description: 'Relational and document database management systems.',
    skills: ['SQL', 'MongoDB', 'SQLite']
  },
  {
    title: 'Tools & Platforms',
    description: 'Development environments, version control systems, and interactive notebooks.',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab', 'Streamlit']
  }
];

// ----------------------------------------------------------------------------
// Editable Services Placeholders
// ----------------------------------------------------------------------------

export const servicesData: Service[] = [
  {
    id: 'service-1',
    title: 'Machine Learning Development',
    shortDescription: 'Designing predictive models, data preprocessing pipelines, and custom machine learning algorithms.',
    editableNote: 'Service scope editable'
  },
  {
    id: 'service-2',
    title: 'Computer Vision Solutions',
    shortDescription: 'Building image classification, object detection, and visual inspection algorithms with OpenCV and deep learning.',
    editableNote: 'Service scope editable'
  },
  {
    id: 'service-3',
    title: 'Generative AI Applications',
    shortDescription: 'Implementing LLM integration, prompt engineering workflows, and Retrieval-Augmented Generation (RAG).',
    editableNote: 'Service scope editable'
  },
  {
    id: 'service-4',
    title: 'Full-Stack Development',
    shortDescription: 'Developing responsive web user interfaces and robust server applications using React.js, Node.js, and Express.',
    editableNote: 'Service scope editable'
  },
  {
    id: 'service-5',
    title: 'AI-Powered Web Applications',
    shortDescription: 'Seamlessly embedding machine learning endpoints and AI functionality into end-user web applications.',
    editableNote: 'Service scope editable'
  },
  {
    id: 'service-6',
    title: 'API Development',
    shortDescription: 'Creating RESTful API endpoints for server-client communication and microservice integrations.',
    editableNote: 'Service scope editable'
  }
];

// ----------------------------------------------------------------------------
// Phase 3 Placeholders (Projects & Blog)
// ----------------------------------------------------------------------------

export const projectsData: Project[] = [
  {
    id: 'p-1',
    slug: 'fifa-match-predictor-ai',
    title: 'FIFA Match Predictor AI',
    subtitle: 'Sports Analytics & Machine Learning',
    category: 'AI & Machine Learning',
    shortDescription: 'AI-powered sports analytics engine using Machine Learning to evaluate team metrics, historical performance, and head-to-head statistics for predicting FIFA match outcomes.',
    fullDescription: 'AI-powered sports analytics engine using Machine Learning to evaluate team metrics, historical performance, and head-to-head statistics for predicting FIFA match outcomes.',
    problemStatement: 'Predicting international football match results requires analyzing complex multi-variable metrics, team form, and statistical head-to-head indicators.',
    solution: 'Engineered a supervised machine learning prediction model integrating XGBoost, Scikit-learn, and feature engineering to evaluate team probabilities accurately.',
    features: [
      'Team Form & Metric Extraction',
      'Historical Head-to-Head Feature Analysis',
      'Predictive Match Outcome Probabilities',
      'Interactive Analytics Interface'
    ],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Streamlit'],
    architectureSummary: 'Python processing pipeline feeding trained XGBoost prediction models into an interactive analytics dashboard.',
    githubUrl: 'https://github.com/bzwaqar/fifa-match-predictor-ai',
    liveUrl: 'https://github.com/bzwaqar/fifa-match-predictor-ai',
    featured: true,
    image: '/images/projects/fifa-match-prediction.webp',
    date: '2026'
  },
  {
    id: 'p-2',
    slug: 'supportdesk',
    title: 'SupportDesk AI System',
    subtitle: 'Automated Helpdesk & Document Processing',
    category: 'AI & Machine Learning',
    shortDescription: 'Automated support desk system built with Python for ticket routing, document scanning, and intelligent customer request resolution.',
    fullDescription: 'Automated support desk system built with Python for ticket routing, document scanning, and intelligent customer request resolution.',
    problemStatement: 'Manual customer support ticket classification creates latency and routing bottlenecks.',
    solution: 'Developed an automated ticket parsing and document processing pipeline that routes user issues dynamically based on text classification.',
    features: [
      'Automated Ticket Routing',
      'Document Parsing & OCR Integration',
      'Intelligent Request Classification',
      'Analytics Logging Dashboard'
    ],
    technologies: ['Python', 'FastAPI', 'OpenCV', 'Pandas', 'MongoDB'],
    architectureSummary: 'Python backend parsing support payloads and dispatching ticket updates to MongoDB databases.',
    githubUrl: 'https://github.com/bzwaqar/SupportDesk',
    liveUrl: 'https://github.com/bzwaqar/SupportDesk',
    featured: true,
    image: '/images/projects/support-desk.webp',
    date: '2026'
  },
  {
    id: 'p-3',
    slug: 'ai-artwork-retrieval',
    title: 'AI Artwork Retrieval',
    subtitle: 'Multi-Modal Visual Search Engine',
    category: 'Computer Vision',
    shortDescription: 'Deep learning multi-modal search engine retrieving relevant artworks using visual feature extraction and vector embeddings.',
    fullDescription: 'Deep learning multi-modal search engine retrieving relevant artworks using visual feature extraction and vector embeddings.',
    problemStatement: 'Searching large fine-art catalogs by textual descriptions alone yields inaccurate visual matches.',
    solution: 'Built a multi-modal feature extraction engine indexing art imagery into high-dimensional vector embeddings for cosine similarity retrieval.',
    features: [
      'Visual Feature Extraction',
      'Vector Embedding Indexing',
      'Cosine Similarity Search',
      'High-Resolution Gallery View'
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Scikit-learn', 'Streamlit'],
    architectureSummary: 'Neural vision pipeline extracting feature embeddings and performing vector similarity matching.',
    githubUrl: 'https://github.com/bzwaqar/ai-artwork-retrieval',
    liveUrl: 'https://github.com/bzwaqar/ai-artwork-retrieval',
    featured: true,
    image: '/images/projects/ai-artwork-retrieval.webp',
    date: '2026'
  },
  {
    id: 'p-4',
    slug: 'ai-tech-stack-recommender',
    title: 'AI Tech Stack Recommender',
    subtitle: 'Architecture & Stack Recommendation Engine',
    category: 'AI & Machine Learning',
    shortDescription: 'Intelligent recommendation engine evaluating project parameters to suggest optimal software architecture and tech stacks.',
    fullDescription: 'Intelligent recommendation engine evaluating project parameters to suggest optimal software architecture and tech stacks.',
    problemStatement: 'Developers and product managers struggle to choose ideal technology stacks for specialized project requirements.',
    solution: 'Designed an AI decision support tool evaluating project scale, domain, performance goals, and team expertise to output structured stack blueprints.',
    features: [
      'Domain Requirements Evaluation',
      'Framework & Database Matching',
      'Architectural Trade-off Analysis',
      'Exportable Stack Blueprints'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    architectureSummary: 'Rule-augmented Machine Learning model processing technical inputs and outputting recommended tech stacks.',
    githubUrl: 'https://github.com/bzwaqar/AI-Tech-Stack-Recommender',
    liveUrl: 'https://github.com/bzwaqar/AI-Tech-Stack-Recommender',
    featured: true,
    image: '/images/projects/ai-tech-stack-recommender.webp',
    date: '2026'
  },
  {
    id: 'p-5',
    slug: 'amazon-review-intelligence',
    title: 'Amazon Review Intelligence',
    subtitle: 'NLP & Sentiment Analytics Pipeline',
    category: 'AI & Machine Learning',
    shortDescription: 'Natural language processing and sentiment classification pipeline analyzing customer feedback and review analytics at scale.',
    fullDescription: 'Natural language processing and sentiment classification pipeline analyzing customer feedback and review analytics at scale.',
    problemStatement: 'E-commerce vendors need actionable sentiment insights from tens of thousands of customer text reviews.',
    solution: 'Constructed an NLP classification pipeline tokenizing review text, rating sentiment polarities, and identifying product feedback drivers.',
    features: [
      'TF-IDF & NLTK Text Processing',
      'Sentiment Polarity Classification',
      'Key Phrase Topic Extraction',
      'Interactive Insights Dashboard'
    ],
    technologies: ['Python', 'NLTK', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    architectureSummary: 'Natural Language Processing pipeline vectorizing text corpora and rendering sentiment metrics.',
    githubUrl: 'https://github.com/bzwaqar/Amazon-Review-Intelligence',
    liveUrl: 'https://github.com/bzwaqar/Amazon-Review-Intelligence',
    featured: true,
    image: '/images/projects/amazon-review-intelligence.webp',
    date: '2026'
  },
  {
    id: 'p-6',
    slug: 'breast_cancer_prediction',
    title: 'Breast Cancer Diagnostic ML',
    subtitle: 'Clinical Machine Learning Classification',
    category: 'AI & Machine Learning',
    shortDescription: 'Diagnostic machine learning classification model analyzing clinical patient attributes to predict breast cancer risks accurately.',
    fullDescription: 'Diagnostic machine learning classification model analyzing clinical patient attributes to predict breast cancer risks accurately.',
    problemStatement: 'Early clinical diagnosis requires high-precision ML models to assist oncologists in evaluating medical diagnostic indicators.',
    solution: 'Trained supervised classification models (Logistic Regression, SVM, Random Forest) achieving high sensitivity and diagnostic accuracy.',
    features: [
      'Clinical Feature Normalization',
      'Cross-Validated Model Evaluation',
      'Diagnostic Confusion Matrix Metrics',
      'ROC-AUC Curve Assessment'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Seaborn'],
    architectureSummary: 'Scikit-learn diagnostic pipeline preprocessing biomedical data and outputting classification metrics.',
    githubUrl: 'https://github.com/bzwaqar/Breast_cancer_prediction',
    liveUrl: 'https://github.com/bzwaqar/Breast_cancer_prediction',
    featured: true,
    image: '/images/projects/breast_cancer_prediction.webp',
    date: '2026'
  },
  {
    id: 'p-7',
    slug: 'ocr-vision-pipeline',
    title: 'OCR Vision Pipeline',
    subtitle: 'Optical Character Recognition & Document AI',
    category: 'Computer Vision',
    shortDescription: 'Computer vision text recognition pipeline processing document imagery, optical character scanning, and structured data extraction.',
    fullDescription: 'Computer vision text recognition pipeline processing document imagery, optical character scanning, and structured data extraction.',
    problemStatement: 'Extracting text from scanned receipts, invoices, and IDs suffers from image noise and perspective distortion.',
    solution: 'Engineered an OpenCV image preprocessing pipeline paired with Tesseract OCR for text extraction and JSON output structuring.',
    features: [
      'Perspective Correction & Noise Denoising',
      'Bounding Box Character Scanning',
      'Regex & Key-Value Pair Extraction',
      'Structured JSON Export'
    ],
    technologies: ['Python', 'OpenCV', 'Tesseract OCR', 'NumPy'],
    architectureSummary: 'Computer vision pipeline filtering input frames and extracting textual strings into structured databases.',
    githubUrl: 'https://github.com/bzwaqar/OCR-Vision-Pipeline',
    liveUrl: 'https://github.com/bzwaqar/OCR-Vision-Pipeline',
    featured: true,
    image: '/images/projects/ocr-vision-pipeline.webp',
    date: '2026'
  },
  {
    id: 'p-8',
    slug: 'pixsearch',
    title: 'PixSearch Visual Engine',
    subtitle: 'Real-Time Neural Image Search',
    category: 'Computer Vision',
    shortDescription: 'Real-time visual image search engine utilizing convolutional neural networks for feature extraction and similarity indexing.',
    fullDescription: 'Real-time visual image search engine utilizing convolutional neural networks for feature extraction and similarity indexing.',
    problemStatement: 'Traditional image lookup relies on manual metadata tagging rather than actual visual image content.',
    solution: 'Utilized PyTorch CNN models to generate image feature vectors and match queries against image databases in milliseconds.',
    features: [
      'CNN Deep Feature Extraction',
      'Nearest Neighbor Similarity Matching',
      'Real-Time Camera & Upload Search',
      'Visual Similarity Scores'
    ],
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Streamlit'],
    architectureSummary: 'Neural network vision model generating vector representations for instant visual query matching.',
    githubUrl: 'https://github.com/bzwaqar/PixSearch',
    liveUrl: 'https://github.com/bzwaqar/PixSearch',
    featured: true,
    image: '/images/projects/artificial-intelligence-computer-vision-image-search.webp',
    date: '2026'
  },
  {
    id: 'p-9',
    slug: 'credit-card-fraud-detection',
    title: 'Credit Card Fraud Detection',
    subtitle: 'Cybersecurity Anomaly Detection',
    category: 'AI & Machine Learning',
    shortDescription: 'Financial anomaly detection system training supervised machine learning algorithms to identify fraudulent transaction patterns.',
    fullDescription: 'Financial anomaly detection system training supervised machine learning algorithms to identify fraudulent transaction patterns.',
    problemStatement: 'Severe class imbalance makes identifying credit card fraud challenging for standard machine learning classifiers.',
    solution: 'Applied SMOTE resampling techniques, Isolation Forests, and Random Forest classifiers to flag fraudulent transactions reliably.',
    features: [
      'Class Imbalance SMOTE Handling',
      'Anomaly & Outlier Detection',
      'Real-Time Transaction Scoring',
      'Precision-Recall Optimization'
    ],
    technologies: ['Python', 'Scikit-learn', 'Imbalanced-Learn', 'Pandas'],
    architectureSummary: 'Machine learning fraud detection pipeline analyzing transaction telemetry in real-time.',
    githubUrl: 'https://github.com/bzwaqar/Credit-Card-Fraud-Detection',
    liveUrl: 'https://github.com/bzwaqar/Credit-Card-Fraud-Detection',
    featured: true,
    image: '/images/projects/credit-card-fraud-cybersecurity-digital-payment.webp',
    date: '2026'
  },
  {
    id: 'p-10',
    slug: 'facial_recognition_attendance',
    title: 'Facial Recognition Attendance',
    subtitle: 'Biometric Computer Vision Tracker',
    category: 'Computer Vision',
    shortDescription: 'Real-time biometric attendance tracker leveraging OpenCV and facial landmark verification algorithms for secure identification.',
    fullDescription: 'Real-time biometric attendance tracker leveraging OpenCV and facial landmark verification algorithms for secure identification.',
    problemStatement: 'Manual attendance taking is inefficient and vulnerable to proxy marking.',
    solution: 'Created an automated camera vision attendance monitor that matches faces against registered student databases in real time.',
    features: [
      'Real-Time Camera Video Stream Processing',
      'Facial Landmark Identification',
      'Automated Timestamp Logging',
      'Exportable Attendance Sheets'
    ],
    technologies: ['Python', 'OpenCV', 'Face_Recognition', 'Pandas', 'SQLite'],
    architectureSummary: 'OpenCV video capture loop feeding facial embedding matchers to log attendance records automatically.',
    githubUrl: 'https://github.com/bzwaqar/facial_recognition_attendance',
    liveUrl: 'https://github.com/bzwaqar/facial_recognition_attendance',
    featured: true,
    image: '/images/projects/facial-recognition-security-camera-technology.webp',
    date: '2026'
  },
  {
    id: 'p-11',
    slug: 'ai-bookstore-fullstack',
    title: 'AI Bookstore Full-Stack Platform',
    subtitle: 'E-Commerce & Intelligent Recommendations',
    category: 'Web Development',
    shortDescription: 'End-to-end e-commerce online bookstore featuring personalized AI recommendations, cart checkout, and REST backend.',
    fullDescription: 'End-to-end e-commerce online bookstore featuring personalized AI recommendations, cart checkout, and REST backend.',
    problemStatement: 'Online readers need personalized book recommendations tailored to their unique browsing history and preferences.',
    solution: 'Built a modern full-stack web application combining Next.js frontend, FastAPI services, and collaborative filtering algorithms.',
    features: [
      'Interactive Product Catalog',
      'Personalized Recommendation Engine',
      'Shopping Cart & Checkout Workflow',
      'Responsive Web UI'
    ],
    technologies: ['TypeScript', 'Next.js', 'React', 'FastAPI', 'Tailwind CSS', 'MongoDB'],
    architectureSummary: 'Full-stack application utilizing React Next.js frontend connected to RESTful backend endpoints.',
    githubUrl: 'https://github.com/bzwaqar/ai-bookstore-fullstack',
    liveUrl: 'https://github.com/bzwaqar/ai-bookstore-fullstack',
    featured: true,
    image: '/images/projects/online-bookstore-technology-books-computer.webp',
    date: '2026'
  },
  {
    id: 'p-12',
    slug: 'books-toscrape-web-scraper',
    title: 'Automated Book Scraping Engine',
    subtitle: 'Data Extraction & Web Scraping',
    category: 'Web Development',
    shortDescription: 'Scalable web scraper extracting catalog items, pricing tiers, and inventory data into structured databases automatically.',
    fullDescription: 'Scalable web scraper extracting catalog items, pricing tiers, and inventory data into structured databases automatically.',
    problemStatement: 'Gathering multi-page product catalogs manually is extremely time-consuming and error-prone.',
    solution: 'Developed an automated Python web scraping script using BeautifulSoup and Requests to extract, clean, and store product data.',
    features: [
      'Multi-Page Pagination Traversing',
      'HTML DOM Parsing & Cleaning',
      'CSV & Database Exporting',
      'Rate-Limiting & Error Recovery'
    ],
    technologies: ['Python', 'BeautifulSoup', 'Requests', 'Pandas'],
    architectureSummary: 'Automated scraping script traversing website pagination and outputting structured dataset files.',
    githubUrl: 'https://github.com/bzwaqar/books-toscrape-web-scraper',
    liveUrl: 'https://github.com/bzwaqar/books-toscrape-web-scraper',
    featured: true,
    image: '/images/projects/web-scraping-programming-data-extraction.webp',
    date: '2026'
  },
  {
    id: 'p-13',
    slug: 'retailpulse-exploratory-data-analysis-business-insights',
    title: 'RetailPulse EDA & Business Analytics',
    subtitle: 'Retail Analytics & Executive Dashboards',
    category: 'AI & Machine Learning',
    shortDescription: 'Exploratory data analysis notebook uncovering retail trends, revenue metrics, customer cohorts, and executive business insights.',
    fullDescription: 'Exploratory data analysis notebook uncovering retail trends, revenue metrics, customer cohorts, and executive business insights.',
    problemStatement: 'Retail executive teams require data insights to understand sales trends, product performance, and seasonal demand.',
    solution: 'Executed exploratory data analysis and data visualization workflows translating raw transactional logs into executive reporting charts.',
    features: [
      'Sales & Revenue Metrics Analysis',
      'Customer Cohort Breakdown',
      'Seasonal Demand Forecasting Insights',
      'Interactive Data Visualizations'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    architectureSummary: 'Data analysis workspace transforming raw transaction records into visual business analytics charts.',
    githubUrl: 'https://github.com/bzwaqar/RetailPulse-Exploratory-Data-Analysis-Business-Insights',
    liveUrl: 'https://github.com/bzwaqar/RetailPulse-Exploratory-Data-Analysis-Business-Insights',
    featured: true,
    image: '/images/projects/business-analytics-dashboard-data-visualization.webp',
    date: '2026'
  },
  {
    id: 'p-14',
    slug: 'kmeans-hierarchical-customer-segmentation',
    title: 'Customer Segmentation Analytics',
    subtitle: 'Unsupervised Clustering & Analytics',
    category: 'AI & Machine Learning',
    shortDescription: 'Unsupervised machine learning application grouping customer profiles using K-Means and Hierarchical Clustering algorithms.',
    fullDescription: 'Unsupervised machine learning application grouping customer profiles using K-Means and Hierarchical Clustering algorithms.',
    problemStatement: 'Targeting broad customer demographics leads to sub-optimal marketing engagement.',
    solution: 'Applied K-Means and Agglomerative Clustering algorithms to segment users by spending behavior and purchasing frequency.',
    features: [
      'Elbow Method Cluster Optimization',
      'K-Means & Hierarchical Clustering',
      'Dendrogram Visual Analysis',
      'Customer Persona Profiling'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    architectureSummary: 'Unsupervised machine learning script clustering customer features and plotting segment centroids.',
    githubUrl: 'https://github.com/bzwaqar/kmeans-hierarchical-customer-segmentation',
    liveUrl: 'https://github.com/bzwaqar/kmeans-hierarchical-customer-segmentation',
    featured: true,
    image: '/images/projects/customer-analytics-business-data-segmentation.webp',
    date: '2026'
  },
  {
    id: 'p-15',
    slug: 'social-media-engagement-clustering-application',
    title: 'Social Media Engagement Clustering',
    subtitle: 'Social Analytics & Data Mining',
    category: 'AI & Machine Learning',
    shortDescription: 'Data analytics pipeline categorizing user engagement metrics, post reach, and interaction clusters across social platforms.',
    fullDescription: 'Data analytics pipeline categorizing user engagement metrics, post reach, and interaction clusters across social platforms.',
    problemStatement: 'Understanding content performance across diverse audience clusters requires multi-dimensional analytical modeling.',
    solution: 'Engineered a clustering pipeline analyzing likes, shares, comments, and reach metrics to group high-performing content patterns.',
    features: [
      'Multi-Dimensional Interaction Scaling',
      'Engagement Metric Clustering',
      'Content Virality Profiling',
      'Visual Cluster Plots'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    architectureSummary: 'Analytics application parsing social engagement data and building visual audience segment charts.',
    githubUrl: 'https://github.com/bzwaqar/Social-Media-Engagement-Clustering-Application',
    liveUrl: 'https://github.com/bzwaqar/Social-Media-Engagement-Clustering-Application',
    featured: true,
    image: '/images/projects/social-media-engagement-clustering.webp',
    date: '2026'
  },
  {
    id: 'p-16',
    slug: 'bbc-news-advanced-nlp',
    title: 'BBC News Advanced NLP Classifier',
    subtitle: 'Natural Language Processing & Text Categorization',
    category: 'AI & Machine Learning',
    shortDescription: 'Natural language processing text classification system categorizing news articles into domain topics using TF-IDF and NLP models.',
    fullDescription: 'Natural language processing text classification system categorizing news articles into domain topics using TF-IDF and NLP models.',
    problemStatement: 'Classifying unorganized news article feeds into business, technology, politics, and sports categories automatically.',
    solution: 'Built an NLP classification model utilizing TF-IDF vectorization, stop-word filtering, and Multinomial Naive Bayes classifiers.',
    features: [
      'Text Preprocessing & Lemmatization',
      'TF-IDF N-Gram Vectorization',
      'Multi-Class News Topic Classification',
      'Accuracy & F1-Score Evaluation'
    ],
    technologies: ['Python', 'NLTK', 'Scikit-learn', 'Pandas'],
    architectureSummary: 'NLP text processing pipeline classifying news content into domain topics accurately.',
    githubUrl: 'https://github.com/bzwaqar/bbc-news-advanced-nlp',
    liveUrl: 'https://github.com/bzwaqar/bbc-news-advanced-nlp',
    featured: true,
    image: '/images/projects/news-media-artificial-intelligence-natural-language-processing.webp',
    date: '2026'
  },
  {
    id: 'p-17',
    slug: 'knn-data-classification-pipeline',
    title: 'KNN Data Classification Pipeline',
    subtitle: 'Supervised ML & Model Tuning',
    category: 'AI & Machine Learning',
    shortDescription: 'K-Nearest Neighbors classification engine performing dataset normalization, hyperparameter tuning, and decision surface evaluation.',
    fullDescription: 'K-Nearest Neighbors classification engine performing dataset normalization, hyperparameter tuning, and decision surface evaluation.',
    problemStatement: 'Evaluating optimal K-values and distance metrics in KNN models requires systematic hyperparameter experimentation.',
    solution: 'Developed a reusable machine learning pipeline benchmarking Euclidean vs Manhattan distance metrics across cross-validated splits.',
    features: [
      'StandardScaler Feature Normalization',
      'Optimal K-Value Grid Search',
      'Decision Boundary Plotting',
      'Performance Classification Reports'
    ],
    technologies: ['Python', 'Scikit-learn', 'NumPy', 'Matplotlib'],
    architectureSummary: 'Scikit-learn classification module executing hyperparameter grid search and rendering decision bounds.',
    githubUrl: 'https://github.com/bzwaqar/KNN-Data-Classification-Pipeline',
    liveUrl: 'https://github.com/bzwaqar/KNN-Data-Classification-Pipeline',
    featured: true,
    image: '/images/projects/software-developer-technology-programming-artificial-intelligence.webp',
    date: '2026'
  },
  {
    id: 'p-18',
    slug: 'business-data-semantic-intelligence-pipeline',
    title: 'Business Data Semantic Pipeline',
    subtitle: 'Enterprise Data Intelligence & Knowledge Graphs',
    category: 'AI & Machine Learning',
    shortDescription: 'Enterprise data intelligence pipeline transforming raw business feeds into structured semantic analytics and knowledge graphs.',
    fullDescription: 'Enterprise data intelligence pipeline transforming raw business feeds into structured semantic analytics and knowledge graphs.',
    problemStatement: 'Connecting disparate enterprise data sources into unified semantic insights is vital for business intelligence.',
    solution: 'Designed an ETL and semantic processing pipeline organizing raw unstructured business data into relational intelligence schemas.',
    features: [
      'Unstructured Data ETL Extraction',
      'Semantic Schema Normalization',
      'Entity-Relationship Linkage',
      'Analytical Reporting Outputs'
    ],
    technologies: ['Python', 'Pandas', 'FastAPI', 'MongoDB', 'Scikit-learn'],
    architectureSummary: 'Enterprise data pipeline transforming raw operational feeds into semantic business insights.',
    githubUrl: 'https://github.com/bzwaqar/Business-Data-Semantic-Intelligence-Pipeline',
    liveUrl: 'https://github.com/bzwaqar/Business-Data-Semantic-Intelligence-Pipeline',
    featured: true,
    image: '/images/projects/business-intelligence-data-analytics-artificial-intelligence.webp',
    date: '2026'
  },
  {
    id: 'p-19',
    slug: 'steel-industry-energy-consumption-analysis-and-modeling',
    title: 'Steel Industry Energy Analytics',
    subtitle: 'Industrial Machine Learning & Energy Modeling',
    category: 'AI & Machine Learning',
    shortDescription: 'Industrial predictive modeling analyzing energy consumption, power usage variables, and operational load metrics.',
    fullDescription: 'Industrial predictive modeling analyzing energy consumption, power usage variables, and operational load metrics.',
    problemStatement: 'Optimizing industrial power consumption requires forecasting energy loads based on reactive power and operational factors.',
    solution: 'Built regression and decision tree models predicting energy consumption across heavy manufacturing operational cycles.',
    features: [
      'Power Factor & Load Variables Analysis',
      'Predictive Energy Consumption Modeling',
      'Industrial Variable Correlation Matrix',
      'Model Performance Benchmarking'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn'],
    architectureSummary: 'Predictive modeling workflow evaluating industrial telemetry to optimize energy efficiency.',
    githubUrl: 'https://github.com/bzwaqar/Steel-Industry-Energy-Consumption-Analysis-and-Modeling',
    liveUrl: 'https://github.com/bzwaqar/Steel-Industry-Energy-Consumption-Analysis-and-Modeling',
    featured: true,
    image: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    date: '2026'
  },
  {
    id: 'p-20',
    slug: 'steel-energy-fastapi-pca',
    title: 'Steel Energy PCA & REST API',
    subtitle: 'Dimensionality Reduction & API Service',
    category: 'AI & Machine Learning',
    shortDescription: 'Principal Component Analysis (PCA) dimensionality reduction service served via REST API endpoints for real-time energy insights.',
    fullDescription: 'Principal Component Analysis (PCA) dimensionality reduction service served via REST API endpoints for real-time energy insights.',
    problemStatement: 'High-dimensional sensor data requires reduction before real-time inference to maintain low latency.',
    solution: 'Constructed a PCA feature reduction module integrated into a lightweight FastAPI service for streaming energy analytics.',
    features: [
      'Principal Component Analysis (PCA)',
      'High-Dimensional Variance Retention',
      'FastAPI REST Endpoint Delivery',
      'Real-Time Inference Response'
    ],
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Pandas', 'Uvicorn'],
    architectureSummary: 'FastAPI microservice executing PCA transformations and returning low-latency feature vectors.',
    githubUrl: 'https://github.com/bzwaqar/steel-energy-fastapi-pca',
    liveUrl: 'https://github.com/bzwaqar/steel-energy-fastapi-pca',
    featured: true,
    image: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    date: '2026'
  },
  {
    id: 'p-21',
    slug: 'diabetes-risk-prediction-system-',
    title: 'Diabetes Risk Prediction System',
    subtitle: 'Clinical Healthcare AI & Risk Assessment',
    category: 'AI & Machine Learning',
    shortDescription: 'Machine learning clinical decision support system forecasting diabetes risk factors from health diagnostics and lab indicators.',
    fullDescription: 'Machine learning clinical decision support system forecasting diabetes risk factors from health diagnostics and lab indicators.',
    problemStatement: 'Assisting medical practitioners in identifying early type-2 diabetes risk indicators using patient lab measurements.',
    solution: 'Engineered a supervised risk assessment classifier trained on medical diagnostic indicators (Glucose, BMI, Age, Insulin).',
    features: [
      'Medical Attribute Preprocessing',
      'Probabilistic Risk Scoring',
      'Sensitivity & Specificity Optimization',
      'Interactive Clinical Input UI'
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    architectureSummary: 'Clinical ML assessment engine parsing patient health parameters and calculating risk probabilities.',
    githubUrl: 'https://github.com/bzwaqar/Diabetes-Risk-Prediction-System-',
    liveUrl: 'https://github.com/bzwaqar/Diabetes-Risk-Prediction-System-',
    featured: true,
    image: '/images/projects/healthcare-data-analysis-artificial-intelligence.webp',
    date: '2026'
  }
];
export const blogPostsData: BlogPost[] = [];

export const phase3ProjectsNotice = {
  title: 'Projects Pipeline (Phase 3 Preparedness)',
  description: 'In Phase 3, this section will automatically import, parse, and showcase GitHub repositories via automated API extraction.',
  githubProfile: 'https://github.com/bzwaqar'
};
