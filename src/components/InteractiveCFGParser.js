import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, AlertCircle, CheckCircle, Code2, GitBranch, Trash2 } from 'lucide-react';

const InteractiveCFGParser = () => {
  const [inputString, setInputString] = useState('');
  const [parseResult, setParseResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Tokenizer
  const tokenize = (input) => {
    const tokens = [];
    let i = 0;
    const str = input.trim();

    while (i < str.length) {
      if (str[i] === ' ') {
        i++;
        continue;
      }
      if (str[i] === '+' || str[i] === '*' || str[i] === '(' || str[i] === ')') {
        tokens.push(str[i]);
        i++;
      } else if (str.substring(i, i + 2) === 'id') {
        tokens.push('id');
        i += 2;
      } else {
        return { error: `Invalid character at position ${i}: '${str[i]}'` };
      }
    }
    return { tokens };
  };

  // Recursive Descent Parser
  const parse = (tokens) => {
    let pos = 0;
    const derivationSteps = [];
    const parseTreeNodes = [];
    let nodeId = 0;

    const parseE = (parent = null) => {
      const currentNode = { id: nodeId++, symbol: 'E', children: [], parent, type: 'non-terminal' };
      parseTreeNodes.push(currentNode);
      
      derivationSteps.push({ step: getCurrentString(), rule: 'E → T + E | T', applied: false });

      const tNode = parseT(currentNode);
      if (!tNode) return null;
      currentNode.children.push(tNode);

      if (pos < tokens.length && tokens[pos] === '+') {
        const plusNode = { id: nodeId++, symbol: '+', children: [], parent: currentNode, type: 'terminal' };
        parseTreeNodes.push(plusNode);
        currentNode.children.push(plusNode);
        derivationSteps.push({ step: getCurrentString(), rule: 'E → T + E', applied: true });
        pos++;

        const eNode = parseE(currentNode);
        if (!eNode) return null;
        currentNode.children.push(eNode);
      } else {
        derivationSteps.push({ step: getCurrentString(), rule: 'E → T', applied: true });
      }

      return currentNode;
    };

    const parseT = (parent = null) => {
      const currentNode = { id: nodeId++, symbol: 'T', children: [], parent, type: 'non-terminal' };
      parseTreeNodes.push(currentNode);

      const fNode = parseF(currentNode);
      if (!fNode) return null;
      currentNode.children.push(fNode);

      if (pos < tokens.length && tokens[pos] === '*') {
        const starNode = { id: nodeId++, symbol: '*', children: [], parent: currentNode, type: 'terminal' };
        parseTreeNodes.push(starNode);
        currentNode.children.push(starNode);
        derivationSteps.push({ step: getCurrentString(), rule: 'T → F * T', applied: true });
        pos++;

        const tNode = parseT(currentNode);
        if (!tNode) return null;
        currentNode.children.push(tNode);
      } else {
        derivationSteps.push({ step: getCurrentString(), rule: 'T → F', applied: true });
      }

      return currentNode;
    };

    const parseF = (parent = null) => {
      const currentNode = { id: nodeId++, symbol: 'F', children: [], parent, type: 'non-terminal' };
      parseTreeNodes.push(currentNode);

      if (pos >= tokens.length) return null;

      if (tokens[pos] === '(') {
        const leftParen = { id: nodeId++, symbol: '(', children: [], parent: currentNode, type: 'terminal' };
        parseTreeNodes.push(leftParen);
        currentNode.children.push(leftParen);
        derivationSteps.push({ step: getCurrentString(), rule: 'F → ( E )', applied: true });
        pos++;

        const eNode = parseE(currentNode);
        if (!eNode) return null;
        currentNode.children.push(eNode);

        if (pos >= tokens.length || tokens[pos] !== ')') return null;
        const rightParen = { id: nodeId++, symbol: ')', children: [], parent: currentNode, type: 'terminal' };
        parseTreeNodes.push(rightParen);
        currentNode.children.push(rightParen);
        pos++;
      } else if (tokens[pos] === 'id') {
        const idNode = { id: nodeId++, symbol: 'id', children: [], parent: currentNode, type: 'terminal' };
        parseTreeNodes.push(idNode);
        currentNode.children.push(idNode);
        derivationSteps.push({ step: getCurrentString(), rule: 'F → id', applied: true });
        pos++;
      } else {
        return null;
      }

      return currentNode;
    };

    const getCurrentString = () => {
      return tokens.join(' ');
    };

    const tree = parseE();
    
    if (!tree || pos !== tokens.length) {
      return { 
        success: false, 
        error: pos < tokens.length 
          ? `Unexpected token '${tokens[pos]}' at position ${pos}` 
          : 'Incomplete parse',
        derivationSteps: derivationSteps.slice(0, 5)
      };
    }

    return { success: true, tree, derivationSteps, parseTreeNodes };
  };

  const handleParse = () => {
    setIsLoading(true);
    setTimeout(() => {
      const { tokens, error } = tokenize(inputString);
      
      if (error) {
        setParseResult({ success: false, error });
        setIsLoading(false);
        return;
      }

      if (tokens.length === 0) {
        setParseResult({ success: false, error: 'Empty input string' });
        setIsLoading(false);
        return;
      }

      const result = parse(tokens);
      setParseResult(result);
      setIsLoading(false);
    }, 300);
  };

  const examples = [
    { label: 'Simple', value: 'id + id' },
    { label: 'With Multiply', value: 'id + id * id' },
    { label: 'Nested', value: '( id + id ) * id' },
    { label: 'Complex', value: 'id * ( id + id )' }
  ];

  const renderParseTree = (node, x, y, width, depth = 0) => {
    if (!node) return null;

    const childCount = node.children.length;
    const elements = [];

    // Improved spacing calculation
    const verticalGap = 90;
    const minHorizontalGap = 60;
    
    // Calculate better width distribution for children
    let childWidth = width / Math.max(childCount, 1);
    if (childWidth < minHorizontalGap && childCount > 1) {
      childWidth = minHorizontalGap;
    }

    // Draw lines to children first (so they appear behind nodes)
    node.children.forEach((child, index) => {
      const childX = childCount === 1 
        ? x // Center single child
        : x - (childWidth * (childCount - 1)) / 2 + childWidth * index;
      const childY = y + verticalGap;
      
      elements.push(
        <line
          key={`line-${node.id}-${child.id}`}
          x1={x}
          y1={y + 28}
          x2={childX}
          y2={childY - 28}
          stroke={node.type === 'non-terminal' ? '#6366f1' : '#22d3ee'}
          strokeWidth="2"
          opacity="0.6"
        />
      );
    });

    // Draw current node
    const isTerminal = node.type === 'terminal';
    const radius = 25;
    
    elements.push(
      <g key={`node-${node.id}`}>
        <circle
          cx={x}
          cy={y}
          r={radius}
          fill={isTerminal ? '#22d3ee' : '#6366f1'}
          stroke={isTerminal ? '#22d3ee' : '#6366f1'}
          strokeWidth="2"
        />
        <text
          x={x}
          y={y + 6}
          textAnchor="middle"
          fill={isTerminal ? '#0b0f19' : 'white'}
          fontSize="16"
          fontWeight="bold"
          fontFamily="'Fira Code', monospace"
        >
          {node.symbol}
        </text>
      </g>
    );

    // Recursively draw children with improved positioning
    node.children.forEach((child, index) => {
      const childX = childCount === 1 
        ? x // Center single child
        : x - (childWidth * (childCount - 1)) / 2 + childWidth * index;
      const childY = y + verticalGap;
      
      // Calculate appropriate width for each subtree
      const subtreeWidth = childCount === 1 ? width : Math.max(childWidth, minHorizontalGap * 2);
      
      elements.push(...renderParseTree(child, childX, childY, subtreeWidth, depth + 1));
    });

    return elements;
  };

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      <div className="flex items-center mb-6">
        <Code2 className="mr-3 text-accent-400" size={32} />
        <h3 className="text-2xl font-bold text-text-primary">
          Interactive CFG Parser
        </h3>
      </div>

      {/* Grammar Display */}
      <div className="glass rounded-lg p-4 mb-6 border-glow">
        <h4 className="text-sm font-semibold text-primary-400 mb-3">Grammar Rules:</h4>
        <div className="font-mono text-sm text-text-secondary space-y-1">
          <div>E → E + T | T</div>
          <div>T → T * F | F</div>
          <div>F → ( E ) | id</div>
        </div>
        <p className="text-xs text-text-muted mt-3">
          This grammar defines arithmetic expressions with + and * operators, parentheses, and identifiers.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-2">
            Enter String to Parse:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleParse()}
              placeholder="e.g., id + id * id"
              className="flex-1 px-4 py-3 glass-dark rounded-lg text-text-primary font-mono border-2 border-primary-500/30 focus:border-accent-400 focus:outline-none transition-all"
            />
            <motion.button
              onClick={handleParse}
              disabled={!inputString.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-400 text-white rounded-lg font-semibold shadow-glow hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={20} />
              <span>{isLoading ? 'Parsing...' : 'Parse'}</span>
            </motion.button>
            <motion.button
              onClick={() => {
                setInputString('');
                setParseResult(null);
              }}
              className="px-4 py-3 glass-dark border border-primary-500/30 text-text-secondary rounded-lg hover:bg-primary-500/10 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 size={20} />
            </motion.button>
          </div>
        </div>

        {/* Example Buttons */}
        <div>
          <p className="text-sm text-text-secondary mb-2">Quick Examples:</p>
          <div className="flex flex-wrap gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setInputString(example.value)}
                className="px-4 py-2 glass rounded-lg text-sm text-text-secondary hover:bg-primary-500/20 hover:text-text-primary transition-all"
              >
                {example.label}: <span className="font-mono text-accent-400">{example.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {parseResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Success/Error Message */}
            <div className={`flex items-start space-x-3 p-4 rounded-lg ${
              parseResult.success 
                ? 'glass border-l-4 border-green-400 bg-green-400/5' 
                : 'glass border-l-4 border-red-400 bg-red-400/5'
            }`}>
              {parseResult.success ? (
                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={24} />
              ) : (
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={24} />
              )}
              <div>
                <h4 className={`font-semibold mb-1 ${
                  parseResult.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  {parseResult.success ? 'Valid String!' : 'Invalid String'}
                </h4>
                <p className="text-sm text-text-secondary">
                  {parseResult.success 
                    ? `The string "${inputString}" is accepted by the grammar.` 
                    : parseResult.error}
                </p>
              </div>
            </div>

            {/* Derivation Steps */}
            {parseResult.derivationSteps && parseResult.derivationSteps.length > 0 && (
              <div className="glass-dark rounded-lg p-6 border-glow">
                <h4 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                  <GitBranch className="mr-2 text-accent-400" size={20} />
                  Derivation Steps
                </h4>
                <div className="space-y-2">
                  {parseResult.derivationSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 glass rounded-lg"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm text-accent-400">{step.rule}</p>
                        {step.applied && (
                          <p className="text-xs text-text-muted mt-1">Applied to derive: {step.step}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Parse Tree Visualization */}
            {parseResult.success && parseResult.tree && (
              <div className="glass-dark rounded-lg p-6 border-glow">
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  Parse Tree Visualization
                </h4>
                <div className="glass rounded-lg p-6 overflow-x-auto">
                  <svg 
                    viewBox="0 0 1400 800" 
                    className="w-full h-auto"
                    style={{ minHeight: '600px' }}
                  >
                    {renderParseTree(parseResult.tree, 700, 50, 1300)}
                  </svg>
                </div>
                <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                    <span className="text-text-secondary">Non-terminal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-accent-400"></div>
                    <span className="text-text-secondary">Terminal</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!parseResult && (
        <div className="glass rounded-lg p-6 border-glow text-center">
          <p className="text-text-secondary mb-2">
            Enter a string using <span className="font-mono text-accent-400">id</span>, 
            <span className="font-mono text-accent-400"> + </span>, 
            <span className="font-mono text-accent-400"> * </span>, 
            <span className="font-mono text-accent-400"> ( </span>, and 
            <span className="font-mono text-accent-400"> ) </span>
          </p>
          <p className="text-text-muted text-sm">
            The parser will validate your input and show the derivation steps and parse tree.
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveCFGParser;
