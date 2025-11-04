import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import InteractiveDerivation from '../InteractiveDerivation';
import InteractiveCFGParser from '../InteractiveCFGParser';

const Example = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const grammar = [
    { rule: 'S → aSb', description: 'S produces "a", followed by S, followed by "b"' },
    { rule: 'S → ε', description: 'S can also produce an empty string' }
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 via-primary-500/5 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            Grammars & Languages in Action
          </h2>
          
          {/* Section Introduction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-text-secondary text-center mb-12 max-w-3xl mx-auto"
          >
            Let's see how Context-Free Grammars generate Context-Free Languages through interactive examples. 
            Try the parsers below and watch how grammars produce languages!
          </motion.p>

          {/* Grammar Rules */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark rounded-2xl shadow-glow p-8 mb-8"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6">Grammar Rules & Generated Language</h3>
            <div className="space-y-4">
              {grammar.map((item, index) => (
                <div
                  key={index}
                  className="grammar-rule"
                >
                  <p className="font-mono text-xl text-accent-400 mb-2">{item.rule}</p>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 glass rounded-lg border-glow">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-400">Context-Free Language Generated:</strong> L = {'{'}a<sup>n</sup>b<sup>n</sup> | n ≥ 0{'}'}
              </p>
              <p className="text-sm text-text-muted mt-2">
                This grammar generates a context-free language with strings having equal numbers of a's and b's, where all a's come before all b's.
              </p>
            </div>
          </motion.div>

          {/* Interactive CFG Parser - NEW! */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <InteractiveCFGParser />
          </motion.div>

          {/* Interactive Derivation Component */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          >
            <InteractiveDerivation />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Example;
