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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 gradient-text">
            Parse Tree Visualization
          </h2>

          <div className="glass-dark rounded-2xl shadow-glow p-8 md:p-10">
            {/* Explanation */}
            <div className="flex items-start space-x-4 mb-8">
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

            {/* Grammar Reference */}
            <div className="grammar-rule mb-8">
              <p className="font-mono text-lg text-text-primary">
                <strong className="text-accent-400">Grammar:</strong> S → aSb | ε
              </p>
              <p className="font-mono text-lg text-text-primary mt-2">
                <strong className="text-accent-400">String:</strong> aabb
              </p>
            </div>

            {/* Parse Tree Visualization */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center mb-8"
            >
              <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
                {/* Level 0 - Root */}
                <motion.g
                  initial={{ opacity: 0, y: -20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <circle cx="300" cy="50" r="25" fill="#6366f1" />
                  <text x="300" y="57" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">S</text>
                </motion.g>

                {/* Lines from S to a, S, b (Level 1) */}
                <motion.g
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <line x1="300" y1="75" x2="200" y2="130" stroke="#9ca3af" strokeWidth="2" />
                  <line x1="300" y1="75" x2="300" y2="130" stroke="#9ca3af" strokeWidth="2" />
                  <line x1="300" y1="75" x2="400" y2="130" stroke="#9ca3af" strokeWidth="2" />
                </motion.g>

                {/* Level 1 - a, S, b */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <circle cx="200" cy="150" r="25" fill="#22d3ee" />
                  <text x="200" y="157" textAnchor="middle" fill="#0b0f19" fontSize="20" fontWeight="bold">a</text>
                  
                  <circle cx="300" cy="150" r="25" fill="#6366f1" />
                  <text x="300" y="157" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">S</text>
                  
                  <circle cx="400" cy="150" r="25" fill="#22d3ee" />
                  <text x="400" y="157" textAnchor="middle" fill="#0b0f19" fontSize="20" fontWeight="bold">b</text>
                </motion.g>

                {/* Lines from middle S to a, S, b (Level 2) */}
                <motion.g
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                >
                  <line x1="300" y1="175" x2="250" y2="230" stroke="#9ca3af" strokeWidth="2" />
                  <line x1="300" y1="175" x2="300" y2="230" stroke="#9ca3af" strokeWidth="2" />
                  <line x1="300" y1="175" x2="350" y2="230" stroke="#9ca3af" strokeWidth="2" />
                </motion.g>

                {/* Level 2 - a, S, b */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <circle cx="250" cy="250" r="25" fill="#22d3ee" />
                  <text x="250" y="257" textAnchor="middle" fill="#0b0f19" fontSize="20" fontWeight="bold">a</text>
                  
                  <circle cx="300" cy="250" r="25" fill="#6366f1" />
                  <text x="300" y="257" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">S</text>
                  
                  <circle cx="350" cy="250" r="25" fill="#22d3ee" />
                  <text x="350" y="257" textAnchor="middle" fill="#0b0f19" fontSize="20" fontWeight="bold">b</text>
                </motion.g>

                {/* Line from bottom S to ε */}
                <motion.g
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ delay: 1.9, duration: 0.5 }}
                >
                  <line x1="300" y1="275" x2="300" y2="330" stroke="#9ca3af" strokeWidth="2" />
                </motion.g>

                {/* Level 3 - ε */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  <circle cx="300" cy="350" r="25" fill="#a78bfa" />
                  <text x="300" y="357" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">ε</text>
                </motion.g>

                {/* Legend */}
                <g>
                  <circle cx="50" cy="370" r="12" fill="#6366f1" />
                  <text x="70" y="376" fontSize="14" fill="#e5e7eb">Non-terminal</text>
                  
                  <circle cx="200" cy="370" r="12" fill="#22d3ee" />
                  <text x="220" y="376" fontSize="14" fill="#e5e7eb">Terminal</text>
                  
                  <circle cx="350" cy="370" r="12" fill="#a78bfa" />
                  <text x="370" y="376" fontSize="14" fill="#e5e7eb">Empty string</text>
                </g>
              </svg>
            </motion.div>

            {/* Key Points */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="glass rounded-lg p-4 border-l-2 border-primary-500">
                <h4 className="font-semibold text-text-primary mb-2">Tree Structure</h4>
                <p className="text-sm text-text-secondary">
                  The root is the start symbol, internal nodes are variables, and leaves are terminals or ε.
                </p>
              </div>
              <div className="glass rounded-lg p-4 border-l-2 border-accent-400">
                <h4 className="font-semibold text-text-primary mb-2">Derivation Path</h4>
                <p className="text-sm text-text-secondary">
                  Reading leaves left-to-right gives the derived string: a + a + ε + b + b = aabb.
                </p>
              </div>
            </div>
          </div>

          {/* Arithmetic Expression Parse Trees - NEW! */}
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
