'use client';

import { motion } from 'framer-motion';
import { servicesData } from '@/lib/data';

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Professional Services
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Specialized expertise in artificial intelligence, backend systems, and full-stack engineering.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {service.shortDescription}
              </p>
              
              <div className="mt-auto">
                <a 
                  href="/#contact" 
                  className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors group"
                >
                  Discuss Project
                  <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
