import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GitMerge, Layers } from 'lucide-react';

const WorkedExamples = () => {
  const [activeExample, setActiveExample] = useState('ambiguous');

  const examples = {
    ambiguous: {
      title: 'Ambiguous Grammar Example',
      icon: GitMerge,
      content: (
        <div className="space-y-6">
          <div className="glass rounded-lg p-6 border-glow">
            <h4 className="text-lg font-bold text-accent-400 mb-4">Grammar for Arithmetic Expressions:</h4>
            <div className="font-mono text-text-primary space-y-2 text-lg">
              <div>E → E + E</div>
              <div>E → E * E</div>
              <div>E → id</div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-4">String: id + id * id</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Parse Tree 1 */}
              <div className="glass rounded-lg p-4 border-glow">
                <h5 className="text-sm font-semibold text-primary-400 mb-3">Parse Tree 1: ((id + id) * id)</h5>
                <svg viewBox="0 0 300 250" className="w-full h-auto">
                  <line x1="150" y1="40" x2="100" y2="90" stroke="#6366f1" strokeWidth="2" />
                  <line x1="150" y1="40" x2="200" y2="90" stroke="#6366f1" strokeWidth="2" />
                  
                  <circle cx="150" cy="40" r="20" fill="#6366f1" />
                  <text x="150" y="47" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">E</text>
                  
                  <circle cx="100" cy="90" r="20" fill="#6366f1" />
                  <text x="100" y="97" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">E</text>
                  
                  <text x="150" y="97" textAnchor="middle" fill="#22d3ee" fontSize="20" fontWeight="bold">*</text>
                  
                  <circle cx="200" cy="90" r="20" fill="#22d3ee" />
                  <text x="200" y="97" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>

                  <line x1="100" y1="110" x2="70" y2="160" stroke="#6366f1" strokeWidth="2" />
                  <line x1="100" y1="110" x2="130" y2="160" stroke="#6366f1" strokeWidth="2" />

                  <circle cx="70" cy="160" r="20" fill="#22d3ee" />
                  <text x="70" y="167" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>
                  
                  <text x="100" y="167" textAnchor="middle" fill="#22d3ee" fontSize="20" fontWeight="bold">+</text>
                  
                  <circle cx="130" cy="160" r="20" fill="#22d3ee" />
                  <text x="130" y="167" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>
                </svg>
                <p className="text-xs text-text-secondary mt-3 text-center">
                  Interpretation: Multiply (id + id) by id
                </p>
              </div>

              {/* Parse Tree 2 */}
              <div className="glass rounded-lg p-4 border-glow">
                <h5 className="text-sm font-semibold text-accent-400 mb-3">Parse Tree 2: (id + (id * id))</h5>
                <svg viewBox="0 0 300 250" className="w-full h-auto">
                  <line x1="150" y1="40" x2="100" y2="90" stroke="#6366f1" strokeWidth="2" />
                  <line x1="150" y1="40" x2="200" y2="90" stroke="#6366f1" strokeWidth="2" />
                  
                  <circle cx="150" cy="40" r="20" fill="#6366f1" />
                  <text x="150" y="47" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">E</text>
                  
                  <circle cx="100" cy="90" r="20" fill="#22d3ee" />
                  <text x="100" y="97" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>
                  
                  <text x="150" y="97" textAnchor="middle" fill="#22d3ee" fontSize="20" fontWeight="bold">+</text>
                  
                  <circle cx="200" cy="90" r="20" fill="#6366f1" />
                  <text x="200" y="97" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">E</text>

                  <line x1="200" y1="110" x2="170" y2="160" stroke="#6366f1" strokeWidth="2" />
                  <line x1="200" y1="110" x2="230" y2="160" stroke="#6366f1" strokeWidth="2" />

                  <circle cx="170" cy="160" r="20" fill="#22d3ee" />
                  <text x="170" y="167" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>
                  
                  <text x="200" y="167" textAnchor="middle" fill="#22d3ee" fontSize="20" fontWeight="bold">*</text>
                  
                  <circle cx="230" cy="160" r="20" fill="#22d3ee" />
                  <text x="230" y="167" textAnchor="middle" fill="#0b0f19" fontSize="14" fontWeight="bold">id</text>
                </svg>
                <p className="text-xs text-text-secondary mt-3 text-center">
                  Interpretation: Add id to (id * id)
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 glass-dark rounded-lg border-l-4 border-orange-400">
              <p className="text-sm text-text-secondary">
                <strong className="text-orange-400">Problem:</strong> The same string has two different parse trees with different meanings! 
                This makes the grammar ambiguous. To fix this, we need to add precedence rules or restructure the grammar.
              </p>
            </div>
          </div>
        </div>
      )
    },
    cnf: {
      title: 'Chomsky Normal Form (CNF) Conversion',
      icon: Layers,
      content: (
        <div className="space-y-6">
          <div className="glass rounded-lg p-6 border-glow">
            <h4 className="text-lg font-bold text-accent-400 mb-4">Original Grammar:</h4>
            <div className="font-mono text-text-primary space-y-2">
              <div>S → ASB | ε</div>
              <div>A → aAS | a</div>
              <div>B → SbS | A | bb</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-text-primary">Step-by-Step CNF Conversion:</h4>

            {/* Step 1 */}
            <div className="glass rounded-lg p-5 border-l-4 border-primary-400">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold mr-3">1</div>
                <h5 className="font-semibold text-text-primary">Add new start symbol</h5>
              </div>
              <div className="font-mono text-sm text-text-secondary ml-11">
                <div>S₀ → S</div>
                <div>S → ASB | ε</div>
                <div>A → aAS | a</div>
                <div>B → SbS | A | bb</div>
              </div>
              <p className="text-xs text-text-muted mt-2 ml-11">
                Prevent recursion from start symbol appearing on the right-hand side
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass rounded-lg p-5 border-l-4 border-accent-400">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-accent-400 text-dark-bg flex items-center justify-center font-bold mr-3">2</div>
                <h5 className="font-semibold text-text-primary">Eliminate ε-productions</h5>
              </div>
              <div className="font-mono text-sm text-text-secondary ml-11">
                <div>S₀ → S | ε</div>
                <div>S → ASB | AB</div>
                <div>A → aAS | aS | a</div>
                <div>B → SbS | Sb | bS | b | A | bb</div>
              </div>
              <p className="text-xs text-text-muted mt-2 ml-11">
                Add productions without nullable non-terminals
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass rounded-lg p-5 border-l-4 border-primary-400">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold mr-3">3</div>
                <h5 className="font-semibold text-text-primary">Eliminate unit productions</h5>
              </div>
              <div className="font-mono text-sm text-text-secondary ml-11">
                <div>S₀ → ASB | AB | ε</div>
                <div>S → ASB | AB</div>
                <div>A → aAS | aS | a</div>
                <div>B → SbS | Sb | bS | b | aAS | aS | a | bb</div>
              </div>
              <p className="text-xs text-text-muted mt-2 ml-11">
                Replace B → A with actual productions of A
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass rounded-lg p-5 border-l-4 border-accent-400">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-accent-400 text-dark-bg flex items-center justify-center font-bold mr-3">4</div>
                <h5 className="font-semibold text-text-primary">Convert to CNF form (A → BC or A → a)</h5>
              </div>
              <div className="font-mono text-sm text-text-secondary ml-11 space-y-1">
                <div className="text-accent-400">Final CNF Grammar:</div>
                <div>S₀ → AS₁ | AB | ε</div>
                <div>S₁ → SB</div>
                <div>S → AS₁ | AB</div>
                <div>A → UA₂ | US | a</div>
                <div>A₂ → AS</div>
                <div>B → SB₃ | Sb | BS₄ | b | UA₂ | US | a | UU</div>
                <div>B₃ → bS</div>
                <div>B₄ → bS</div>
                <div>U → a</div>
              </div>
              <p className="text-xs text-text-muted mt-2 ml-11">
                All productions now have form A → BC (two non-terminals) or A → a (single terminal)
              </p>
            </div>
          </div>

          <div className="p-4 glass-dark rounded-lg border-glow">
            <p className="text-sm text-text-secondary">
              <strong className="text-primary-400">Result:</strong> The grammar is now in Chomsky Normal Form, 
              which is useful for algorithms like CYK parsing and proving context-free languages.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      <div className="flex items-center mb-6">
        <BookOpen className="mr-3 text-accent-400" size={32} />
        <h3 className="text-2xl font-bold text-text-primary">
          Concrete Worked Examples
        </h3>
      </div>

      {/* Example Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(examples).map(([key, example]) => {
          const Icon = example.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveExample(key)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeExample === key
                  ? 'bg-gradient-to-r from-primary-500 to-accent-400 text-white shadow-glow'
                  : 'glass text-text-secondary hover:bg-primary-500/20'
              }`}
            >
              <Icon size={20} />
              <span>{example.title}</span>
            </button>
          );
        })}
      </div>

      {/* Example Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {examples[activeExample].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WorkedExamples;
