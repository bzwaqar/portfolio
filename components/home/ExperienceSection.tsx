'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Professional Experience
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              My journey in software engineering and artificial intelligence.
            </p>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-red-100 text-red-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-lg">{exp.role}</h3>
                  <time className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-md mt-2 sm:mt-0 w-fit">
                    {exp.period}
                  </time>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-4 font-medium">
                  <span className="text-gray-900">{exp.company}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span>{exp.location}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span>{exp.type}</span>
                </div>

                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="text-red-500 mr-2 mt-1 shrink-0">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
