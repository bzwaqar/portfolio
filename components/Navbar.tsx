'use client';

/**
 * ============================================================================
 * NAVBAR COMPONENT (components/Navbar.tsx)
 * ============================================================================
 * Clean, light personal-brand navbar.
 * Sticky, scroll-aware, active section highlighting.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'Skills', href: '/#skills', id: 'skills' },
    { name: 'Projects', href: '/#projects', id: 'projects' },
    { name: 'Experience', href: '/#experience', id: 'experience' },
    { name: 'Certifications', href: '/#certifications', id: 'certifications' },
    { name: 'Services', href: '/#services', id: 'services' },
    { name: 'Contact', href: '/#contact', id: 'contact' },
  ];

  // Handle scroll state for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    navLinks.forEach((link) => {
      if (link.id) {
        const element = document.getElementById(link.id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  const isActive = (id: string, href: string) => {
    if (pathname === '/') {
      return activeSection === id;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-white/70 py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Title */}
        <Link 
          href="/#home"
          onClick={(e) => handleScrollTo(e, 'home')}
          className="group flex items-center space-x-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
            WK
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight text-gray-900">{personalInfo.name}</span>
            <span className="text-[11px] font-medium text-gray-500">AI/ML &amp; Full-Stack Engineer</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center space-x-1 lg:flex" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const active = isActive(link.id, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'text-red-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.name}
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-red-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white px-4 pt-2 pb-4 lg:hidden shadow-lg absolute w-full" id="mobile-menu">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.id, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    active
                      ? 'text-red-600 font-semibold bg-red-50'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
