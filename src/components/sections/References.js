import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BookMarked, ExternalLink, User, Calendar } from 'lucide-react';

const References = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const references = [
    {
      title: 'Introduction to Automata Theory, Languages, and Computation',
      authors: 'John E. Hopcroft, Rajeev Motwani, Jeffrey D. Ullman',
      year: '2006',
      publisher: 'Pearson Education',
      edition: '3rd Edition'
    },
    {
      title: 'Compilers: Principles, Techniques, and Tools',
      authors: 'Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman',
      year: '2006',
      publisher: 'Addison-Wesley',
      edition: '2nd Edition (Dragon Book)'
    },
    {
      title: 'Theory of Computation',
      authors: 'Michael Sipser',
      year: '2012',
      publisher: 'Cengage Learning',
      edition: '3rd Edition'
    },
    {
      title: 'Formal Languages and Automata Theory',
      authors: 'Peter Linz',
      year: '2011',
      publisher: 'Jones & Bartlett Learning',
      edition: '5th Edition'
    }
  ];

  const onlineResources = [
    {
      title: 'Stanford CS154: Introduction to Automata and Complexity Theory',
      url: 'https://cs154.stanford.edu',
      type: 'Course Materials'
    },
    {
      title: 'MIT OpenCourseWare: Automata, Computability, and Complexity',
      url: 'https://ocw.mit.edu',
      type: 'Lecture Notes'
    }
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-primary-500/10" />
      
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
              <BookMarked className="text-accent-400 animate-pulse" size={64} />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              References & Credits
            </h2>
          </div>

          {/* Academic References */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-8 border-glow"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6">Academic References</h3>
            
            <div className="space-y-4">
              {references.map((ref, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="border-l-4 border-primary-400/70 glass rounded-r-lg p-4 hover-glow transition-all"
                >
                  <h4 className="font-bold text-text-primary mb-2">{ref.title}</h4>
                  <p className="text-sm text-text-secondary mb-1">
                    <strong className="text-accent-400">Authors:</strong> {ref.authors}
                  </p>
                  <p className="text-sm text-text-secondary">
                    <strong className="text-accent-400">Publisher:</strong> {ref.publisher} ({ref.year}) - {ref.edition}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Online Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-8 border-glow"
          >
            <h3 className="text-2xl font-semibold text-text-primary mb-6">Online Resources</h3>
            
            <div className="space-y-3">
              {onlineResources.map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                  className="flex items-center justify-between glass rounded-lg p-4 hover-glow transition-all"
                >
                  <div>
                    <h4 className="font-semibold text-text-primary">{resource.title}</h4>
                    <p className="text-xs text-text-secondary mt-1">{resource.type}</p>
                  </div>
                  <ExternalLink className="text-accent-400" size={20} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="glass-dark rounded-2xl shadow-glow p-8 text-center border-glow bg-gradient-to-r from-primary-500/20 to-accent-400/20"
          >
            <h3 className="text-2xl font-semibold mb-6 text-text-primary">About This Presentation</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col items-center">
                <User className="mb-2 text-accent-400" size={32} />
                <p className="text-sm text-text-secondary">Created By</p>
                <p className="font-semibold text-text-primary">Your Name / Team</p>
              </div>
              
              <div className="flex flex-col items-center">
                <Calendar className="mb-2 text-accent-400" size={32} />
                <p className="text-sm text-text-secondary">Date</p>
                <p className="font-semibold text-text-primary">November 2025</p>
              </div>
              
              <div className="flex flex-col items-center">
                <BookMarked className="mb-2 text-accent-400" size={32} />
                <p className="text-sm text-text-secondary">Course</p>
                <p className="font-semibold text-text-primary">Automata Theory</p>
              </div>
            </div>

            <div className="border-t border-primary-500/30 pt-6">
              <p className="text-sm text-text-secondary mb-2">Built with</p>
              <div className="flex justify-center space-x-4 text-sm text-text-primary">
                <span>React</span>
                <span>•</span>
                <span>Framer Motion</span>
                <span>•</span>
                <span>Tailwind CSS</span>
                <span>•</span>
                <span>Lucide Icons</span>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 text-center text-text-secondary"
          >
            <p className="text-sm">
              Thank you for exploring Context-Free Grammar with us! 🎓
            </p>
            <p className="text-xs mt-2 text-text-secondary opacity-70">
              © 2025 - Educational Presentation
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default References;
