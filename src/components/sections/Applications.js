import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, MessageSquare, Braces, Zap, Gamepad2 } from 'lucide-react';
import CFGCookingGame from '../CFGCookingGame';

const Applications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showGame, setShowGame] = useState(false);

  const applications = [
      {
        icon: Code,
      title: 'Compiler Design',
      description: 'CFGs define programming language syntax, while CFLs represent the set of all valid programs. Compilers use these to parse and validate source code.',
      examples: ['Lexical analysis', 'Syntax parsing', 'Abstract Syntax Trees (AST)', 'Error detection'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      description: 'CFGs model grammatical structure, generating CFLs that represent all grammatically correct sentences in a natural language subset.',
      examples: ['Sentence parsing', 'Grammar checking', 'Machine translation', 'Speech recognition'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Braces,
      title: 'Programming Language Design',
      description: 'Language designers use CFGs to specify syntax rules, which define the CFL of all syntactically valid programs in that language.',
      examples: ['BNF notation', 'Language specifications', 'IDE development', 'Syntax highlighting'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Zap,
      title: 'XML/HTML Parsing',
      description: 'CFGs define document structure rules, and valid XML/HTML documents form a CFL that can be parsed and validated efficiently.',
      examples: ['Document validation', 'Web scraping', 'Data extraction', 'Format conversion'],
      color: 'from-green-500 to-teal-500',
      bgColor: 'from-green-50 to-teal-50'
    }
  ];

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
            Apply CFG and CFL concepts in a hands‑on challenge: arrange ingredients into correct CFG‑derived recipes in our interactive Cooking Game.
          </p>

          {/* Interactive Game Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
          </motion.div>

          {/* Game Section */}
          {showGame && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <CFGCookingGame />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Applications;
