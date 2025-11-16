import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import CFGCookingGame from '../CFGCookingGame';

const Applications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-primary-500/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            CFG Cooking Game
          </h2>
          <p className="text-center text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Master CFG concepts through interactive gameplay: drag and drop ingredients to build recipes following grammar rules and earn points in this hands-on challenge.
          </p>

          {/* Game Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <CFGCookingGame />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Applications;
