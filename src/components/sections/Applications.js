import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, MessageSquare, Braces, Zap } from 'lucide-react';

const Applications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const applications = [
    {
      icon: Code,
      title: 'Compiler Design',
      description: 'CFGs are fundamental in syntax analysis and parsing phases of compilers. They define the syntactic structure of programming languages.',
      examples: ['Lexical analysis', 'Syntax parsing', 'Abstract Syntax Trees (AST)', 'Error detection'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      description: 'CFGs model the grammatical structure of natural languages, enabling computers to understand and generate human language.',
      examples: ['Sentence parsing', 'Grammar checking', 'Machine translation', 'Speech recognition'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Braces,
      title: 'Programming Language Design',
      description: 'Language designers use CFGs to formally specify the syntax of new programming languages, ensuring consistency and clarity.',
      examples: ['BNF notation', 'Language specifications', 'IDE development', 'Syntax highlighting'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      icon: Zap,
      title: 'XML/HTML Parsing',
      description: 'CFGs are used to parse and validate structured documents, ensuring they conform to specified formats and schemas.',
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
            Applications of CFG
          </h2>
          <p className="text-center text-xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Context-Free Grammars are crucial in various domains of computer science, 
            from compiler construction to natural language processing.
          </p>

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
