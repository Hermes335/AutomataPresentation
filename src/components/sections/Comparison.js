import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GitCompare, AlertCircle, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import WorkedExamples from '../WorkedExamples';

const Comparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const comparisonData = [
    {
      aspect: 'Expressive Power',
      regular: 'Least powerful - finite memory',
      cfg: 'More powerful - can handle nested structures'
    },
    {
      aspect: 'Recognition Device',
      regular: 'Finite Automata (FA/DFA/NFA)',
      cfg: 'Pushdown Automata (PDA)'
    },
    {
      aspect: 'Memory Structure',
      regular: 'No external memory',
      cfg: 'Stack-based memory'
    },
    {
      aspect: 'Language Examples',
      regular: 'a*, (a|b)*, patterns',
      cfg: 'aⁿbⁿ, palindromes, nested parentheses'
    },
    {
      aspect: 'Closure Properties',
      regular: 'Closed under union, concatenation, star',
      cfg: 'Closed under union, concatenation, star'
    }
  ];

  const limitations = [
    {
      title: 'Cannot Express aⁿbⁿcⁿ',
      description: 'Languages requiring counting across multiple variables beyond two cannot be expressed by CFGs.',
      example: 'The language {aⁿbⁿcⁿ | n ≥ 0} requires context-sensitive grammar.'
    },
    {
      title: 'No Cross-Serial Dependencies',
      description: 'CFGs struggle with languages where dependencies cross each other in complex ways.',
      example: 'Some natural language constructions exceed CFG capabilities.'
    },
    {
      title: 'Limited by Pumping Lemma',
      description: 'The pumping lemma for CFGs provides a way to prove certain languages are not context-free.',
      example: 'Used to demonstrate theoretical limitations of CFGs.'
    }
  ];

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      {/* Section gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-400/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 gradient-text">
            CFG & CFL in Context
          </h2>
          
          {/* Section Introduction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl text-text-secondary text-center mb-12 max-w-4xl mx-auto"
          >
            Before exploring real-world applications, let's understand where Context-Free Grammars 
            and Context-Free Languages fit in the Chomsky hierarchy and what their limitations are.
          </motion.p>

          {/* CFG vs Regular Grammar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-10 border-glow"
          >
            <h3 className="text-3xl font-semibold text-text-primary mb-6 flex items-center">
              <GitCompare className="mr-3 text-accent-400" size={32} />
              Context-Free vs Regular Grammar
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary-500/30">
                    <th className="text-left p-4 font-semibold text-text-primary">Aspect</th>
                    <th className="text-left p-4 font-semibold text-primary-400">Regular Grammar</th>
                    <th className="text-left p-4 font-semibold text-accent-400">Context-Free Grammar</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="border-b border-primary-500/20 hover:bg-primary-500/10 transition-colors"
                    >
                      <td className="p-4 font-medium text-text-primary">{row.aspect}</td>
                      <td className="p-4 text-text-secondary bg-primary-500/5">{row.regular}</td>
                      <td className="p-4 text-text-secondary bg-accent-400/5">{row.cfg}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hierarchy Diagram */}
            <div className="mt-8 p-6 glass rounded-lg border-glow">
              <h4 className="font-semibold text-text-primary mb-4 text-center text-xl">Chomsky Hierarchy</h4>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-full max-w-md">
                  <div className="glass-dark border-2 border-red-400/50 rounded-lg p-3 text-center hover-glow transition-all">
                    <p className="font-semibold text-text-primary">Recursively Enumerable</p>
                    <p className="text-xs text-text-secondary">Type 0 - Turing Machine</p>
                  </div>
                </div>
                <div className="w-4/5">
                  <div className="glass-dark border-2 border-orange-400/50 rounded-lg p-3 text-center hover-glow transition-all">
                    <p className="font-semibold text-text-primary">Context-Sensitive</p>
                    <p className="text-xs text-text-secondary">Type 1 - Linear Bounded Automaton</p>
                  </div>
                </div>
                <div className="w-3/5">
                  <div className="glass-dark border-2 border-accent-400 rounded-lg p-3 text-center shadow-glow">
                    <p className="font-semibold text-accent-400">Context-Free ← We are here</p>
                    <p className="text-xs text-text-secondary">Type 2 - Pushdown Automaton</p>
                  </div>
                </div>
                <div className="w-2/5">
                  <div className="glass-dark border-2 border-primary-400/50 rounded-lg p-3 text-center hover-glow transition-all">
                    <p className="font-semibold text-text-primary">Regular</p>
                    <p className="text-xs text-text-secondary">Type 3 - Finite Automaton</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Context-Free Language Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-10 border-glow"
          >
            <h3 className="text-3xl font-semibold text-text-primary mb-6 flex items-center">
              <Sparkles className="mr-3 text-accent-400" size={32} />
              Properties of Context-Free Languages
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Closure Properties */}
              <div className="glass rounded-xl p-6 border-glow">
                <h4 className="font-bold text-primary-400 mb-4 text-lg">Closure Properties</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-text-primary font-medium">Closed Under</p>
                      <p className="text-sm text-text-secondary">Union, Concatenation, Kleene Star, Reversal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <XCircle className="text-red-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-text-primary font-medium">NOT Closed Under</p>
                      <p className="text-sm text-text-secondary">Intersection, Complement</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recognition & Decidability */}
              <div className="glass rounded-xl p-6 border-glow">
                <h4 className="font-bold text-accent-400 mb-4 text-lg">Recognition & Decidability</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-text-primary font-medium">Membership Problem</p>
                      <p className="text-sm text-text-secondary">Decidable - CYK algorithm O(n³)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-text-primary font-medium">Emptiness Problem</p>
                      <p className="text-sm text-text-secondary">Decidable - Can determine if L(G) = ∅</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <XCircle className="text-red-400 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-text-primary font-medium">Equivalence Problem</p>
                      <p className="text-sm text-text-secondary">Undecidable - Cannot always determine if L(G₁) = L(G₂)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pumping Lemma */}
              <div className="glass rounded-xl p-6 border-glow md:col-span-2">
                <h4 className="font-bold text-primary-400 mb-4 text-lg">Pumping Lemma for CFLs</h4>
                <div className="font-mono text-sm text-accent-400 bg-dark-bg/50 p-4 rounded-lg mb-3">
                  <p>If L is a CFL, then ∃p (pumping length) such that:</p>
                  <p className="mt-2">∀ string s ∈ L where |s| ≥ p, ∃ division s = uvxyz where:</p>
                  <ul className="list-disc list-inside mt-2 text-xs space-y-1 text-text-secondary">
                    <li>|vxy| ≤ p</li>
                    <li>|vy| ≥ 1</li>
                    <li>∀i ≥ 0: uv<sup>i</sup>xy<sup>i</sup>z ∈ L</li>
                  </ul>
                </div>
                <p className="text-sm text-text-secondary">
                  Used to prove that certain languages (like {'{'}a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>{'}'}) are NOT context-free.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Limitations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 border-glow"
          >
            <h3 className="text-3xl font-semibold text-text-primary mb-6 flex items-center">
              <AlertCircle className="mr-3 text-orange-400" size={32} />
              Limitations of Context-Free Languages
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {limitations.map((limit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                  className="glass rounded-xl p-6 border-l-4 border-orange-400/70 hover-glow transition-all"
                >
                  <h4 className="font-bold text-text-primary mb-3">{limit.title}</h4>
                  <p className="text-sm text-text-secondary mb-3">{limit.description}</p>
                  <div className="glass-dark rounded p-3 border-glow">
                    <p className="text-xs font-mono text-accent-400">{limit.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 glass rounded-lg border-glow">
              <p className="text-sm text-text-secondary">
                <strong className="text-primary-400">Note:</strong> Despite these limitations, CFGs remain highly practical for most programming 
                language syntax and many natural language constructions.
              </p>
            </div>
          </motion.div>

          {/* Ambiguity Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass-dark rounded-2xl shadow-glow p-8 md:p-10 mb-10 border-glow"
          >
            <h3 className="text-3xl font-semibold text-text-primary mb-6 flex items-center">
              <Sparkles className="mr-3 text-orange-400" size={32} />
              Handling Ambiguity in Grammars
            </h3>

            <div className="space-y-6">
              {/* What is Ambiguity */}
              <div className="glass rounded-xl p-6 border-glow">
                <h4 className="font-bold text-accent-400 mb-3 text-lg">What is Ambiguity?</h4>
                <p className="text-text-secondary mb-4">
                  A grammar is <strong className="text-primary-400">ambiguous</strong> if there exists at least one string that has 
                  <strong className="text-accent-400"> two or more distinct parse trees</strong> (or leftmost/rightmost derivations).
                </p>
                <div className="glass-dark rounded-lg p-4 border-glow">
                  <p className="text-sm text-text-muted mb-2">Example: Ambiguous Arithmetic Grammar</p>
                  <div className="font-mono text-accent-400 space-y-1 text-sm">
                    <p>E → E + E | E * E | (E) | id</p>
                  </div>
                  <p className="text-xs text-text-muted mt-3">
                    The string "id + id * id" has multiple parse trees, leading to different evaluation orders.
                  </p>
                </div>
              </div>

              {/* Resolution Strategies */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strategy 1: Precedence */}
                <div className="glass rounded-xl p-6 border-l-4 border-primary-500">
                  <h4 className="font-bold text-primary-400 mb-3">1. Operator Precedence</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Rewrite grammar to enforce operator precedence hierarchy.
                  </p>
                  <div className="glass-dark rounded-lg p-3 border-glow">
                    <p className="text-xs text-text-muted mb-2">Unambiguous Grammar:</p>
                    <div className="font-mono text-accent-400 space-y-1 text-xs">
                      <p>E → E + T | T</p>
                      <p>T → T * F | F</p>
                      <p>F → (E) | id</p>
                    </div>
                    <p className="text-xs text-green-400 mt-2">✓ * has higher precedence than +</p>
                  </div>
                </div>

                {/* Strategy 2: Associativity */}
                <div className="glass rounded-xl p-6 border-l-4 border-accent-400">
                  <h4 className="font-bold text-accent-400 mb-3">2. Associativity Rules</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Specify left or right associativity through grammar structure.
                  </p>
                  <div className="glass-dark rounded-lg p-3 border-glow">
                    <p className="text-xs text-text-muted mb-2">Left-Associative:</p>
                    <div className="font-mono text-accent-400 space-y-1 text-xs">
                      <p>E → E + T</p>
                      <p className="text-green-400">✓ (a+b)+c</p>
                    </div>
                    <p className="text-xs text-text-muted mt-2 mb-2">Right-Associative:</p>
                    <div className="font-mono text-accent-400 space-y-1 text-xs">
                      <p>E → T + E</p>
                      <p className="text-green-400">✓ a+(b+c)</p>
                    </div>
                  </div>
                </div>

                {/* Strategy 3: Longest Match */}
                <div className="glass rounded-xl p-6 border-l-4 border-orange-400">
                  <h4 className="font-bold text-orange-400 mb-3">3. Longest Match Rule</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Always choose the production that consumes the most input (greedy matching).
                  </p>
                  <div className="glass-dark rounded-lg p-3 border-glow">
                    <p className="text-xs text-accent-400">Used in lexical analysis</p>
                    <p className="text-xs text-text-secondary mt-2">
                      Example: "ifx" matches as single identifier, not "if" + "x"
                    </p>
                  </div>
                </div>

                {/* Strategy 4: Disambiguation Rules */}
                <div className="glass rounded-xl p-6 border-l-4 border-green-400">
                  <h4 className="font-bold text-green-400 mb-3">4. Parser Directives</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Use parser generator directives (like in Yacc/Bison) to specify precedence.
                  </p>
                  <div className="glass-dark rounded-lg p-3 border-glow">
                    <p className="text-xs text-text-muted mb-2">Yacc Example:</p>
                    <div className="font-mono text-accent-400 space-y-1 text-xs">
                      <p>%left '+' '-'</p>
                      <p>%left '*' '/'</p>
                      <p>%right '^'</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Practical Note */}
              <div className="glass rounded-xl p-6 border-glow bg-gradient-to-r from-primary-500/10 to-accent-400/10">
                <h4 className="font-bold text-text-primary mb-3">💡 Practical Approach</h4>
                <p className="text-sm text-text-secondary">
                  In compiler design, ambiguity is typically resolved at the <strong className="text-primary-400">grammar level</strong> by 
                  restructuring productions, or at the <strong className="text-accent-400">parser level</strong> using precedence declarations. 
                  Modern parser generators like ANTLR, Yacc, and Bison provide built-in mechanisms for disambiguation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Worked Examples Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8"
          >
            <WorkedExamples />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comparison;
