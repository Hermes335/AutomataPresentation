import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';
import InteractiveDerivation from '../InteractiveDerivation';
import InteractiveCFGParser from '../InteractiveCFGParser';

const Example = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentStep, setCurrentStep] = useState(0);

  const grammar = [
    { rule: 'S → aSb', description: 'S produces "a", followed by S, followed by "b"' },
    { rule: 'S → ε', description: 'S can also produce an empty string' }
  ];

  const derivationSteps = [
    { step: 'S', description: 'Start with the start symbol' },
    { step: 'aSb', description: 'Apply rule: S → aSb' },
    { step: 'aaSbb', description: 'Apply rule: S → aSb again' },
    { step: 'aaaSbbb', description: 'Apply rule: S → aSb once more' },
    { step: 'aaabbb', description: 'Apply rule: S → ε to terminate' }
  ];

  const nextStep = () => {
    if (currentStep < derivationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
  };

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
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 gradient-text">
            CFG Example
          </h2>

          {/* Grammar Rules */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark rounded-2xl shadow-glow p-8 mb-8"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6">Grammar Rules</h3>
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
                <strong className="text-primary-400">Language Generated:</strong> L = {'{'}a<sup>n</sup>b<sup>n</sup> | n ≥ 0{'}'}
              </p>
              <p className="text-sm text-text-muted mt-2">
                This grammar generates strings with equal numbers of a's and b's, where all a's come before all b's.
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

          {/* Traditional Step Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark rounded-2xl shadow-glow p-8 mt-8"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center">
              <PlayCircle className="mr-3 text-accent-400" size={28} />
              Alternative Example: a<sup>n</sup>b<sup>n</sup> Derivation
            </h3>

            {/* Steps Display */}
            <div className="space-y-3 mb-8">
              {derivationSteps.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.3,
                    scale: index <= currentStep ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    index === currentStep
                      ? 'glass border-2 border-primary-500 shadow-glow'
                      : index < currentStep
                      ? 'glass-dark'
                      : 'glass-dark opacity-50'
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shadow-glow-sm">
                    {index}
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-2xl text-accent-400 mb-1">{item.step}</p>
                    <p className="text-sm text-text-secondary">{item.description}</p>
                  </div>
                  {index < derivationSteps.length - 1 && (
                    <ArrowRight className="text-text-muted" size={20} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={nextStep}
                disabled={currentStep >= derivationSteps.length - 1}
                className="flex-1 bg-gradient-to-r from-primary-500 to-accent-400 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep >= derivationSteps.length - 1 ? 'Completed!' : 'Next Step'}
              </button>
              <button
                onClick={resetDemo}
                className="px-6 py-3 glass-dark border border-primary-500 text-primary-400 rounded-lg font-semibold hover:shadow-glow-sm transition-all"
              >
                Reset
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Example;
