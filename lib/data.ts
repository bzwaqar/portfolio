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

export const projectsData: Project[] = [];
export const blogPostsData: BlogPost[] = [];

export const phase3ProjectsNotice = {
  title: 'Projects Pipeline (Phase 3 Preparedness)',
  description: 'In Phase 3, this section will automatically import, parse, and showcase GitHub repositories via automated API extraction.',
  githubProfile: 'https://github.com/bzwaqar'
};
