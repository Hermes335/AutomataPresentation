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
            Real-World Applications
          </h2>
          <p className="text-center text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Now that you understand CFGs, CFLs, and their theoretical context, discover how they power 
            real-world technologies you use every day.
          </p>

          {/* Interactive Game Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <button
              onClick={() => setShowGame(!showGame)}
              className="mx-auto flex items-center gap-3 bg-gradient-to-r from-primary-500 to-accent-400 text-white font-bold py-4 px-8 rounded-xl hover:shadow-glow transition-all text-lg"
            >
              <Gamepad2 size={28} />
              {showGame ? 'Hide' : 'Play'} Interactive CFG Cooking Game
            </button>
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

          {/* Applications Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-dark rounded-2xl shadow-glow overflow-hidden hover-glow transition-all"
                whileHover={{ scale: 1.02 }}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500/20 to-accent-400/20 p-6 border-b border-primary-500/30">
                  <div className="flex items-center space-x-4 text-text-primary">
                    <div className="bg-primary-500/30 p-3 rounded-lg">
                      <app.icon size={32} className="text-accent-400" />
                    </div>
                    <h3 className="text-2xl font-bold">{app.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-text-secondary leading-relaxed mb-4">
                    {app.description}
                  </p>

                  {/* Examples */}
                  <div className="glass rounded-lg p-4 border-glow">
                    <h4 className="font-semibold text-primary-400 mb-3 text-sm uppercase tracking-wide">
                      Key Applications:
                    </h4>
                    <ul className="space-y-2">
                      {app.examples.map((example, i) => (
                        <li key={i} className="flex items-center text-sm text-text-secondary">
                          <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 glass-dark rounded-xl shadow-glow p-6 text-center border-glow"
          >
            <p className="text-text-secondary text-lg">
              <strong className="text-accent-400">Impact:</strong> CFGs bridge theoretical computer science and practical applications, 
              making them indispensable tools for software development and language processing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Applications;
