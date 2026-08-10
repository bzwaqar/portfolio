import { ObjectId } from 'mongodb';

// Common Types
export type MongoId = string | ObjectId;

// ----------------------------------------------------------------------------
// PROJECT MODELS
// ----------------------------------------------------------------------------
export interface ProjectImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Project {
  _id?: MongoId;
  github_id?: number;
  name: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  problem_statement?: string;
  solution_statement?: string;
  readme_content?: string;
  github_url: string;
  demo_url?: string;
  languages?: string[];
  topics?: string[];
  features?: string[];
  technologies?: string[];
  stars?: number;
  forks?: number;
  created_at?: string;
  updated_at?: string;
  synced_at?: Date | string;
  featured?: boolean;
  published?: boolean;
  images?: string[];
  image?: ProjectImage;
}

export interface ProjectCreate extends Omit<Project, '_id'> {}
export interface ProjectUpdate extends Partial<ProjectCreate> {}

// ----------------------------------------------------------------------------
// BLOG MODELS
// ----------------------------------------------------------------------------
export interface BlogAuthor {
  name: string;
  role: string;
  avatar_url?: string;
}

export interface BlogContentSection {
  heading: string;
  paragraph: string;
}

export interface BlogPost {
  _id?: MongoId;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogContentSection[];
  date: string;
  readTime: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  image: string;
  published?: boolean;
}

export interface BlogPostCreate extends Omit<BlogPost, '_id'> {}
export interface BlogPostUpdate extends Partial<BlogPostCreate> {}

// ----------------------------------------------------------------------------
// PROFILE MODELS
// ----------------------------------------------------------------------------
export interface SocialLinks {
  github?: string;
  linkedin?: string;
}

export interface Profile {
  _id?: MongoId;
  name: string;
  title: string;
  secondary_title?: string;
  specialization?: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  profile_image_url?: string;
  social_links?: SocialLinks;
}

export interface ProfileCreate extends Omit<Profile, '_id'> {}
export interface ProfileUpdate extends Partial<ProfileCreate> {}

// ----------------------------------------------------------------------------
// EXPERIENCE MODELS
// ----------------------------------------------------------------------------
export interface Experience {
  _id?: MongoId;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  technologies?: string[];
}

export interface ExperienceCreate extends Omit<Experience, '_id'> {}
export interface ExperienceUpdate extends Partial<ExperienceCreate> {}

// ----------------------------------------------------------------------------
// EDUCATION MODELS
// ----------------------------------------------------------------------------
export interface Education {
  _id?: MongoId;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  details: string;
}

export interface EducationCreate extends Omit<Education, '_id'> {}
export interface EducationUpdate extends Partial<EducationCreate> {}

// ----------------------------------------------------------------------------
// CERTIFICATION MODELS
// ----------------------------------------------------------------------------
export interface Certification {
  _id?: MongoId;
  title: string;
  issuer: string;
  platform?: string;
  date_earned?: string;
  credential_url?: string;
}

export interface CertificationCreate extends Omit<Certification, '_id'> {}
export interface CertificationUpdate extends Partial<CertificationCreate> {}

// ----------------------------------------------------------------------------
// SKILL MODELS
// ----------------------------------------------------------------------------
export interface Skill {
  _id?: MongoId;
  name: string;
  category: string;
  level?: string;
}

export interface SkillCreate extends Omit<Skill, '_id'> {}
export interface SkillUpdate extends Partial<SkillCreate> {}

// ----------------------------------------------------------------------------
// SERVICE MODELS
// ----------------------------------------------------------------------------
export interface Service {
  _id?: MongoId;
  title: string;
  description: string;
  icon?: string;
  deliverables?: string[];
}

export interface ServiceCreate extends Omit<Service, '_id'> {}
export interface ServiceUpdate extends Partial<ServiceCreate> {}

// ----------------------------------------------------------------------------
// CONTACT MODELS
// ----------------------------------------------------------------------------
export interface ContactMessage {
  _id?: MongoId;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: Date | string;
  read?: boolean;
}

export interface ContactMessageCreate {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
