import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Network } from 'lucide-react';
import InteractiveParseTree from '../InteractiveParseTree';
import ArithmeticParseTree from '../ArithmeticParseTree';

const ParseTree = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-primary-500/5 via-accent-400/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            Understanding Parse Trees
          </h2>
          
          {/* Section Introduction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-text-secondary text-center mb-12 max-w-3xl mx-auto"
          >
            Parse trees provide a visual representation of how strings are derived. 
            Explore the hierarchical structure through interactive examples below.
          </motion.p>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-8"
          >
            <div className="flex items-start space-x-4">
              <Network className="text-accent-400 flex-shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-3">What is a Parse Tree?</h3>
                <p className="text-text-secondary leading-relaxed">
                  A parse tree is a hierarchical representation of the derivation of a string from a grammar. 
                  Each internal node represents a non-terminal, and each leaf node represents a terminal symbol. 
                  The tree shows the syntactic structure of the derived string.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Arithmetic Expression Parse Trees */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <ArithmeticParseTree />
          </motion.div>

          {/* Interactive Parse Tree Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <InteractiveParseTree />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParseTree;
