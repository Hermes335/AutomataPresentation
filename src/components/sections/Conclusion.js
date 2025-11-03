import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, CheckCircle, Sparkles } from 'lucide-react';

const Conclusion = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const keyTakeaways = [
    {
      title: 'Theoretical Foundation',
      description: 'CFGs provide a mathematical framework for understanding language structure and generation.'
    },
    {
      title: 'Practical Applications',
      description: 'Essential for compiler design, parsing, and language processing in real-world software.'
    },
    {
      title: 'Hierarchical Structure',
      description: 'Parse trees reveal the recursive and nested nature of languages through visual representation.'
    },
    {
      title: 'Balance of Power',
      description: 'More expressive than regular grammars while remaining computationally tractable.'
    }
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-400/5" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <Lightbulb className="text-accent-400 animate-pulse" size={64} />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Conclusion
            </h2>
            <p className="text-xl text-text-secondary">
              Bringing It All Together
            </p>
          </div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-8 border-glow"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center">
              <CheckCircle className="mr-3 text-green-400" size={28} />
              Key Takeaways
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {keyTakeaways.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="glass rounded-xl p-6 border-l-4 border-primary-400/70 hover-glow transition-all"
                >
                  <h4 className="font-bold text-text-primary mb-2 text-lg">{item.title}</h4>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-8 border-glow bg-gradient-to-r from-primary-500/20 to-accent-400/20"
          >
            <Sparkles className="mb-4 text-accent-400" size={32} />
            <blockquote className="text-2xl md:text-3xl font-light italic mb-4 leading-relaxed text-text-primary">
              "Context-Free Grammars bridge theory and practice in the understanding of language structures."
            </blockquote>
            <p className="text-lg text-text-secondary">
              They enable us to formally describe, analyze, and implement languages—both natural and artificial.
            </p>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="glass-dark rounded-2xl shadow-glow p-8 text-center border-glow"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-4">Final Thoughts</h3>
            <p className="text-text-secondary leading-relaxed mb-4">
              Context-Free Grammars are fundamental to computer science, providing the theoretical foundation 
              for language design and implementation. From compilers to natural language processing, CFGs 
              continue to play a crucial role in how we build and understand computational systems.
            </p>
            <p className="text-text-secondary text-sm">
              Understanding CFGs deepens our appreciation for the elegant mathematical structures 
              underlying modern computing.
            </p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 flex justify-center space-x-2"
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-accent-400 rounded-full shadow-glow"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Conclusion;
