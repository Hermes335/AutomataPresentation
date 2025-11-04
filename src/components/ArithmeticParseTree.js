import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';

const ArithmeticParseTree = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      title: 'id + id * id',
      description: 'Demonstrates operator precedence (* before +)',
      explanation: 'The tree shows that multiplication binds tighter than addition, so (id * id) is computed first.',
      svg: (
        <svg viewBox="0 0 600 450" className="w-full h-auto">
          {/* E at root */}
          <line x1="300" y1="50" x2="200" y2="120" stroke="#6366f1" strokeWidth="2" />
          <line x1="300" y1="50" x2="300" y2="120" stroke="#6366f1" strokeWidth="2" />
          <line x1="300" y1="50" x2="400" y2="120" stroke="#6366f1" strokeWidth="2" />
          
          <circle cx="300" cy="50" r="25" fill="#6366f1" />
          <text x="300" y="57" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">E</text>

          {/* Level 1: E, +, T */}
          <circle cx="200" cy="120" r="25" fill="#6366f1" />
          <text x="200" y="127" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">E</text>

          <circle cx="300" cy="120" r="20" fill="#22d3ee" />
          <text x="300" y="127" textAnchor="middle" fill="#0b0f19" fontSize="18" fontWeight="bold">+</text>

          <circle cx="400" cy="120" r="25" fill="#6366f1" />
          <text x="400" y="127" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">T</text>

          {/* Left E -> T -> F -> id */}
          <line x1="200" y1="145" x2="200" y2="200" stroke="#6366f1" strokeWidth="2" />
          <circle cx="200" cy="200" r="25" fill="#6366f1" />
          <text x="200" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">T</text>

          <line x1="200" y1="225" x2="200" y2="280" stroke="#6366f1" strokeWidth="2" />
          <circle cx="200" cy="280" r="25" fill="#6366f1" />
          <text x="200" y="287" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">F</text>

          <line x1="200" y1="305" x2="200" y2="360" stroke="#6366f1" strokeWidth="2" />
          <circle cx="200" cy="360" r="25" fill="#22d3ee" />
          <text x="200" y="367" textAnchor="middle" fill="#0b0f19" fontSize="16" fontWeight="bold">id</text>

          {/* Right T expands to T * F */}
          <line x1="400" y1="145" x2="350" y2="200" stroke="#6366f1" strokeWidth="2" />
          <line x1="400" y1="145" x2="400" y2="200" stroke="#6366f1" strokeWidth="2" />
          <line x1="400" y1="145" x2="450" y2="200" stroke="#6366f1" strokeWidth="2" />

          <circle cx="350" cy="200" r="25" fill="#6366f1" />
          <text x="350" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">T</text>

          <circle cx="400" cy="200" r="20" fill="#22d3ee" />
          <text x="400" y="207" textAnchor="middle" fill="#0b0f19" fontSize="18" fontWeight="bold">*</text>

          <circle cx="450" cy="200" r="25" fill="#6366f1" />
          <text x="450" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">F</text>

          {/* T -> F -> id (middle) */}
          <line x1="350" y1="225" x2="350" y2="280" stroke="#6366f1" strokeWidth="2" />
          <circle cx="350" cy="280" r="25" fill="#6366f1" />
          <text x="350" y="287" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">F</text>

          <line x1="350" y1="305" x2="350" y2="360" stroke="#6366f1" strokeWidth="2" />
          <circle cx="350" cy="360" r="25" fill="#22d3ee" />
          <text x="350" y="367" textAnchor="middle" fill="#0b0f19" fontSize="16" fontWeight="bold">id</text>

          {/* F -> id (right) */}
          <line x1="450" y1="225" x2="450" y2="280" stroke="#6366f1" strokeWidth="2" />
          <circle cx="450" cy="280" r="25" fill="#22d3ee" />
          <text x="450" y="287" textAnchor="middle" fill="#0b0f19" fontSize="16" fontWeight="bold">id</text>

          {/* Annotations */}
          <text x="300" y="420" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">
            Result: id + (id * id) - Multiplication happens first!
          </text>
        </svg>
      )
    },
    {
      title: '(id + id) * id',
      description: 'Parentheses override default precedence',
      explanation: 'The parentheses force addition to happen before multiplication, changing the evaluation order.',
      svg: (
        <svg viewBox="0 0 600 450" className="w-full h-auto">
          {/* E at root */}
          <line x1="300" y1="50" x2="300" y2="120" stroke="#6366f1" strokeWidth="2" />
          
          <circle cx="300" cy="50" r="25" fill="#6366f1" />
          <text x="300" y="57" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">E</text>

          {/* T */}
          <line x1="300" y1="145" x2="200" y2="200" stroke="#6366f1" strokeWidth="2" />
          <line x1="300" y1="145" x2="300" y2="200" stroke="#6366f1" strokeWidth="2" />
          <line x1="300" y1="145" x2="400" y2="200" stroke="#6366f1" strokeWidth="2" />

          <circle cx="300" cy="120" r="25" fill="#6366f1" />
          <text x="300" y="127" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">T</text>

          {/* T, *, F */}
          <circle cx="200" cy="200" r="25" fill="#6366f1" />
          <text x="200" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">T</text>

          <circle cx="300" cy="200" r="20" fill="#22d3ee" />
          <text x="300" y="207" textAnchor="middle" fill="#0b0f19" fontSize="18" fontWeight="bold">*</text>

          <circle cx="400" cy="200" r="25" fill="#6366f1" />
          <text x="400" y="207" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">F</text>

          {/* Left T -> F -> (E) */}
          <line x1="200" y1="225" x2="200" y2="280" stroke="#6366f1" strokeWidth="2" />
          <circle cx="200" cy="280" r="25" fill="#6366f1" />
          <text x="200" y="287" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">F</text>

          <line x1="200" y1="305" x2="150" y2="360" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="305" x2="200" y2="360" stroke="#6366f1" strokeWidth="2" />
          <line x1="200" y1="305" x2="250" y2="360" stroke="#6366f1" strokeWidth="2" />

          <circle cx="150" cy="360" r="20" fill="#22d3ee" />
          <text x="150" y="367" textAnchor="middle" fill="#0b0f19" fontSize="18" fontWeight="bold">(</text>

          <circle cx="200" cy="360" r="25" fill="#6366f1" />
          <text x="200" y="367" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">E</text>

          <circle cx="250" cy="360" r="20" fill="#22d3ee" />
          <text x="250" y="367" textAnchor="middle" fill="#0b0f19" fontSize="18" fontWeight="bold">)</text>

          {/* Inner E -> E + T -> id + id (simplified for space) */}
          <text x="200" y="395" textAnchor="middle" fill="#9ca3af" fontSize="12" fontStyle="italic">
            (expands to: id + id)
          </text>

          {/* Right F -> id */}
          <line x1="400" y1="225" x2="400" y2="280" stroke="#6366f1" strokeWidth="2" />
          <circle cx="400" cy="280" r="25" fill="#22d3ee" />
          <text x="400" y="287" textAnchor="middle" fill="#0b0f19" fontSize="16" fontWeight="bold">id</text>

          {/* Annotation */}
          <text x="300" y="430" textAnchor="middle" fill="#22d3ee" fontSize="14" fontWeight="bold">
            Result: (id + id) * id - Addition happens first!
          </text>
        </svg>
      )
    }
  ];

  const currentExample = examples[selectedExample];

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-text-primary">
          Arithmetic Expression Parse Trees
        </h3>
        <div className="glass px-4 py-2 rounded-lg text-sm text-text-secondary">
          <Info size={16} className="inline mr-2" />
          {selectedExample + 1} / {examples.length}
        </div>
      </div>

      {/* Example Navigation */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={() => setSelectedExample(Math.max(0, selectedExample - 1))}
          disabled={selectedExample === 0}
          className="p-2 glass-dark rounded-lg hover:bg-primary-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} className="text-text-primary" />
        </motion.button>

        <div className="text-center flex-1">
          <h4 className="text-xl font-mono text-accent-400 mb-1">
            {currentExample.title}
          </h4>
          <p className="text-sm text-text-secondary">
            {currentExample.description}
          </p>
        </div>

        <motion.button
          onClick={() => setSelectedExample(Math.min(examples.length - 1, selectedExample + 1))}
          disabled={selectedExample === examples.length - 1}
          className="p-2 glass-dark rounded-lg hover:bg-primary-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} className="text-text-primary" />
        </motion.button>
      </div>

      {/* Parse Tree Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedExample}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass rounded-xl p-6 border-glow mb-6"
        >
          {currentExample.svg}
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <div className="glass rounded-lg p-5 border-l-4 border-accent-400">
        <h5 className="font-semibold text-text-primary mb-2">Understanding this tree:</h5>
        <p className="text-sm text-text-secondary">
          {currentExample.explanation}
        </p>
      </div>

      {/* Grammar Reference */}
      <div className="mt-6 glass rounded-lg p-4 border-glow">
        <h4 className="text-sm font-semibold text-primary-400 mb-2">Grammar Used:</h4>
        <div className="font-mono text-sm text-text-secondary space-y-1">
          <div>E → E + T | T</div>
          <div>T → T * F | F</div>
          <div>F → ( E ) | id</div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-primary-500"></div>
          <span className="text-text-secondary">Non-terminal</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-accent-400"></div>
          <span className="text-text-secondary">Terminal / Operator</span>
        </div>
      </div>
    </div>
  );
};

export default ArithmeticParseTree;
