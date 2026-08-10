'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { skillCategoriesData } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const getSkillImage = (title: string) => {
  if (title === 'Libraries / Frameworks') return '/images/skills/Libraries_Frameworks.webp';
  return `/images/skills/${title}.webp`;
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-50 border-t border-gray-200">
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
              Technical Skills
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A comprehensive overview of my technical expertise spanning AI/ML, backend architecture, and modern web development.
            </p>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {skillCategoriesData.map((category) => (
            <motion.div 
              key={category.title}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              {/* Skill Image */}
              <div className="relative h-40 w-full bg-gray-100 border-b border-gray-200">
                <Image
                  src={getSkillImage(category.title)}
                  alt={`${category.title} skills`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Skill Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-500 mb-5 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
