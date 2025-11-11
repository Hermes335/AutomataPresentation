import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Zap, GitBranch } from 'lucide-react';

const Hero = () => {
  const features = [
    { icon: BookOpen, text: 'Interactive Learning', color: 'text-blue-400' },
    { icon: Code, text: 'Live Examples', color: 'text-green-400' },
    { icon: Zap, text: 'Real-time Parsing', color: 'text-yellow-400' },
    { icon: GitBranch, text: 'Visual Trees', color: 'text-purple-400' }
  ];

  // Added: five notable names between the badge and the title
  const names = [
    'Amolong',
    'Arostique',
    'Cordero',
    'Pillado',
    'Sagala'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-500/30 rounded-full mix-blend-normal filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-400/20 rounded-full mix-blend-normal filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/2 w-[400px] h-[400px] bg-primary-600/15 rounded-full mix-blend-normal filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block mt-8"
          >
            <div className="glass px-6 py-2 rounded-full border-glow">
              <span className="text-sm text-accent-400 font-semibold">Automata Theory &amp; Formal Languages</span>
            </div>
          </motion.div>

          {/* New: list of five names */}
          <motion.div
            className="mb-6 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {names.map((n, i) => (
              <div
                key={i}
                className="glass px-3 py-2 rounded-lg border-glow flex items-center space-x-2 hover:shadow-glow transition-all cursor-pointer"
              >
                {n}
              </div>
            ))}
          </motion.div>

          {/* Main title with enhanced animation */}
          <motion.div
            className="mb-12 pb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.h1
              className="text-7xl md:text-8xl lg:text-9xl font-bold leading-tight"
              style={{
                background: 'linear-gradient(135deg, #818cf8, #22d3ee, #c084fc, #818cf8)',
                backgroundSize: '300% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                paddingBottom: '0.2em',
                lineHeight: '1.2',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center', '0% center'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Context-Free
              <br />
              <span className="text-6xl md:text-7xl lg:text-8xl">Language</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with better typography */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-12 font-light max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Master the foundations of <span className="text-accent-400 font-semibold">parsing</span>, 
            <span className="text-primary-400 font-semibold"> compilers</span>, and 
            <span className="text-accent-400 font-semibold"> language design</span> through 
            interactive visualizations
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass px-5 py-3 rounded-lg border-glow flex items-center space-x-2 hover:shadow-glow transition-all cursor-pointer"
                >
                  <Icon className={feature.color} size={20} />
                  <span className="text-sm text-text-secondary font-medium">{feature.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
          </motion.div>

        
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
