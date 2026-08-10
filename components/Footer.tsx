/**
 * ============================================================================
 * FOOTER COMPONENT (components/Footer.tsx)
 * ============================================================================
 * Clean, light-theme footer with brand, quick links, and social profiles.
 */

import Link from 'next/link';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand & Bio summary */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                WK
              </div>
              <span className="text-lg font-bold text-gray-900">{personalInfo.name}</span>
            </div>
            <p className="max-w-md text-sm text-gray-500 leading-relaxed">
              {personalInfo.primaryTitle} • {personalInfo.secondaryTitle} • {personalInfo.specialization}
            </p>
            <div className="space-y-1 text-sm text-gray-500">
              <div>📍 {personalInfo.location}</div>
              <div>✉️ <a href={`mailto:${personalInfo.email}`} className="text-red-600 hover:underline">{personalInfo.email}</a></div>
              <div>📞 {personalInfo.phone}</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-900 uppercase">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-red-600 transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-red-600 transition-colors">
                  Work Experience
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-red-600 transition-colors">
                  Skills & Tools
                </Link>
              </li>
              <li>
                <Link href="/education" className="hover:text-red-600 transition-colors">
                  Education & Certifications
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-red-600 transition-colors">
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-900 uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors"
                >
                  GitHub (bzwaqar) ↗
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 transition-colors"
                >
                  LinkedIn Profile ↗
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-600 transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js & FastAPI</p>
        </div>
      </div>
    </footer>
  );
}
