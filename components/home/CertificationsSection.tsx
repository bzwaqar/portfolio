'use client';

import { motion } from 'framer-motion';
import { certificationsData } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Certifications & Credentials
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Professional development and specialized training achievements.
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {certificationsData.map((cert) => (
            <motion.div 
              key={cert.id}
              variants={itemVariants}
              className="group relative flex flex-col p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:border-red-200 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Subtle background highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon/Badge placeholder */}
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 text-red-600 shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                  {cert.title}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 font-medium">
                  <span className="truncate">{cert.issuer}</span>
                  {cert.platform && (
                    <span className="bg-white px-2 py-0.5 rounded border border-gray-200 text-xs">
                      {cert.platform}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
