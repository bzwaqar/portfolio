'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';

export default function HeroSection() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          
          {/* Hero Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 z-10"
          >
            {/* Red accent bar */}
            <div className="h-1.5 w-16 bg-red-600 rounded-full" />

            {/* MANDATORY EXACTLY ONE H1 FOR HOMEPAGE */}
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
              I&apos;m Waqar Khan
            </h1>

            {/* Description with inline accent link */}
            <p className="max-w-lg text-lg text-gray-600 leading-relaxed">
              An{' '}
              <span className="text-red-600 font-semibold">AI/ML and Full-Stack Engineer</span>{' '}
              who builds intelligent, production-ready web applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/#projects"
                onClick={(e) => handleScrollTo(e, 'projects')}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white hover:bg-red-700 transition-colors shadow-sm"
              >
                See My Work
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link
                href="/#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-900 hover:bg-gray-50 border border-gray-200 transition-colors shadow-sm"
              >
                Book an Appointment
                <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Hero Right — Professional Photo & Decorative Circles */}
          <div className="relative flex justify-center lg:justify-end">
            
            {/* Animated Decorative Circle 1 (Primary Arc/Circle) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute -right-12 -top-12 h-96 w-96 rounded-full bg-red-600 blur-3xl lg:h-[32rem] lg:w-[32rem] pointer-events-none"
            />

            {/* Animated Decorative Circle 2 (Secondary Arc/Circle) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: 0.1,
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 6, 
                ease: 'easeInOut', 
                repeat: Infinity,
                delay: 0.5 
              }}
              className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-rose-400 blur-2xl lg:h-80 lg:w-80 pointer-events-none"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10 w-full max-w-md aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 shadow-xl border border-gray-200/50"
            >
              <Image
                src={personalInfo.profileImage}
                alt={`Professional photo of ${personalInfo.name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
