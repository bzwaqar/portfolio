/**
 * ============================================================================
 * ADMIN ROUTE LAYOUT (app/admin/layout.tsx) - PHASE 6 SEO
 * ============================================================================
 * Student Note:
 * Protects admin routes from search engine indexing (robots: noindex, nofollow).
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Control Center | Waqar Khan',
  description: 'Private Admin Interface.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
