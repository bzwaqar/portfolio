/**
 * ============================================================================
 * JSON-LD STRUCTURED DATA COMPONENT (components/JsonLd.tsx) - PHASE 6 SEO
 * ============================================================================
 * Student Note:
 * Renders standard Schema.org structured data using JSON-LD script tags.
 * Includes Person, WebSite, BreadcrumbList, and SoftwareSourceCode schemas.
 */

import { personalInfo } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export function PersonJsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: `${personalInfo.primaryTitle} | ${personalInfo.secondaryTitle}`,
    description: personalInfo.bio,
    url: SITE_URL,
    image: `${SITE_URL}/avatar-placeholder.svg`,
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'COMSATS University Islamabad',
    },
    sameAs: [
      personalInfo.github,
      personalInfo.linkedin,
    ],
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Computer Vision',
      'Generative AI',
      'Full Stack Web Development',
      'Next.js',
      'FastAPI',
      'PyTorch',
      'Python',
      'TypeScript',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${personalInfo.name} Portfolio`,
    url: SITE_URL,
    description: `Official portfolio of ${personalInfo.name} — Machine Learning Engineer and Full Stack Engineer.`,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export function SoftwareProjectJsonLd({
  title,
  description,
  url,
  codeRepository,
  programmingLanguage,
}: {
  title: string;
  description: string;
  url: string;
  codeRepository?: string;
  programmingLanguage?: string[];
}) {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: title,
    description: description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    codeRepository: codeRepository || personalInfo.github,
    programmingLanguage: programmingLanguage || ['Python', 'TypeScript'],
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
    />
  );
}
