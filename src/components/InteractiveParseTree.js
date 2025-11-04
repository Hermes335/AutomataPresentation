import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const InteractiveParseTree = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = [
    { id: 'S', x: 250, y: 40, type: 'non-terminal', label: 'S', rule: 'S → ( S )', description: 'Start symbol - root of parse tree' },
    { id: '(1', x: 130, y: 120, type: 'terminal', label: '(', description: 'Left parenthesis terminal' },
    { id: 'S2', x: 250, y: 120, type: 'non-terminal', label: 'S', rule: 'S → ( S )', description: 'Nested S non-terminal' },
    { id: ')1', x: 370, y: 120, type: 'terminal', label: ')', description: 'Right parenthesis terminal' },
    { id: '(2', x: 180, y: 200, type: 'terminal', label: '(', description: 'Inner left parenthesis' },
    { id: 'S3', x: 250, y: 200, type: 'non-terminal', label: 'S', rule: 'S → ε', description: 'S derives to empty string' },
    { id: ')2', x: 320, y: 200, type: 'terminal', label: ')', description: 'Inner right parenthesis' },
    { id: 'eps', x: 250, y: 280, type: 'epsilon', label: 'ε', description: 'Empty string (epsilon)' }
  ];

  const edges = [
    { from: 'S', to: '(1', color: 'primary' },
    { from: 'S', to: 'S2', color: 'primary' },
    { from: 'S', to: ')1', color: 'primary' },
    { from: 'S2', to: '(2', color: 'accent' },
    { from: 'S2', to: 'S3', color: 'accent' },
    { from: 'S2', to: ')2', color: 'accent' },
    { from: 'S3', to: 'eps', color: 'gray' }
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  const handleNodeClick = (nodeId) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };

  const highlightConnectedNodes = (nodeId) => {
    if (!nodeId) return [];
    const connected = [nodeId];
    edges.forEach(edge => {
      if (edge.from === nodeId) connected.push(edge.to);
      if (edge.to === nodeId) connected.push(edge.from);
    });
    return connected;
  };

  const connectedNodes = highlightConnectedNodes(hoveredNode || selectedNode);

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-text-primary">
          Interactive Parse Tree
        </h3>
        <div className="glass px-4 py-2 rounded-lg text-sm text-text-secondary">
          <Info size={16} className="inline mr-2" />
          Click or hover nodes to explore
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SVG Tree Visualization */}
        <div className="flex-1 glass rounded-xl p-6 border-glow">
          <svg viewBox="0 0 500 320" className="w-full h-auto">
            {/* Edges/Lines */}
            <g>
              {edges.map((edge, index) => {
                const fromNode = getNode(edge.from);
                const toNode = getNode(edge.to);
                const isHighlighted = connectedNodes.includes(edge.from) || connectedNodes.includes(edge.to);
                
                return (
                  <motion.line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isHighlighted ? 1 : 0.3,
                      strokeWidth: isHighlighted ? 3 : 2
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    stroke={isHighlighted ? '#22d3ee' : '#6366f1'}
                    strokeOpacity={isHighlighted ? 1 : 0.4}
                  />
                );
              })}
            </g>

            {/* Nodes */}
            <g>
              {nodes.map((node, index) => {
                const isSelected = selectedNode === node.id;
                const isHovered = hoveredNode === node.id;
                const isConnected = connectedNodes.includes(node.id);
                const isActive = isSelected || isHovered || isConnected;

                return (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeClick(node.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Node Circle */}
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.type === 'epsilon' ? 20 : 28}
                      fill={
                        node.type === 'terminal' 
                          ? (isActive ? '#22d3ee' : '#1e293b')
                          : node.type === 'epsilon'
                          ? (isActive ? '#9ca3af' : '#374151')
                          : (isActive ? '#6366f1' : '#1e293b')
                      }
                      stroke={isActive ? '#22d3ee' : '#6366f1'}
                      strokeWidth={isActive ? 3 : 2}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        filter: isActive ? 'drop-shadow(0 0 10px #22d3ee)' : 'none'
                      }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Node Label */}
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? '#e5e7eb' : '#9ca3af'}
                      fontSize={node.type === 'epsilon' ? '18' : '20'}
                      fontWeight="bold"
                      fontFamily="'Fira Code', monospace"
                    >
                      {node.label}
                    </text>

                    {/* Hover/Click Ring Animation */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r={node.type === 'epsilon' ? 20 : 28}
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth={2}
                          initial={{ scale: 1, opacity: 0.8 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-80">
          <AnimatePresence mode="wait">
            {(selectedNode || hoveredNode) ? (
              <motion.div
                key={selectedNode || hoveredNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass rounded-xl p-6 border-glow"
              >
                {(() => {
                  const node = getNode(selectedNode || hoveredNode);
                  return (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-accent-400">{node.label}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          node.type === 'terminal' 
                            ? 'bg-accent-400/20 text-accent-400'
                            : node.type === 'epsilon'
                            ? 'bg-gray-400/20 text-gray-400'
                            : 'bg-primary-400/20 text-primary-400'
                        }`}>
                          {node.type === 'terminal' ? 'Terminal' : node.type === 'epsilon' ? 'Epsilon' : 'Non-terminal'}
                        </span>
                      </div>

                      {node.rule && (
                        <div className="mb-4 p-3 glass-dark rounded-lg">
                          <p className="text-xs text-text-secondary mb-1">Production Rule:</p>
                          <p className="font-mono text-accent-400">{node.rule}</p>
                        </div>
                      )}

                      <p className="text-sm text-text-secondary leading-relaxed">
                        {node.description}
                      </p>

                      {node.type === 'non-terminal' && (
                        <div className="mt-4 p-3 glass-dark rounded-lg">
                          <p className="text-xs text-primary-400 font-semibold mb-2">Tree Position:</p>
                          <p className="text-xs text-text-secondary">
                            {node.id === 'S' ? 'Root of the parse tree' : 'Internal node in the tree'}
                          </p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-6 border-glow flex flex-col items-center justify-center text-center"
                style={{ height: '71%' }}
              >
                <Info className="text-accent-400 mb-4" size={48} />
                <p className="text-text-secondary mb-2">
                  Click or hover over any node to see details
                </p>
                <p className="text-text-muted text-sm">
                  Explore the structure of the parse tree for: <span className="font-mono text-accent-400">(())</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend */}
          <div className="mt-4 glass rounded-xl p-4 border-glow">
            <p className="text-xs font-semibold text-text-primary mb-3">Legend:</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                <span className="text-xs text-text-secondary">Non-terminal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-accent-400"></div>
                <span className="text-xs text-text-secondary">Terminal</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                <span className="text-xs text-text-secondary">Epsilon (ε)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Reference */}
      <div className="mt-6 glass rounded-lg p-4 border-glow">
        <h4 className="text-sm font-semibold text-primary-400 mb-2">Grammar for this tree:</h4>
        <div className="font-mono text-sm text-text-secondary space-y-1">
          <div>S → ( S )</div>
          <div>S → ε</div>
        </div>
        <p className="text-xs text-text-muted mt-2">
          This parse tree shows how the string "(())" is derived from the grammar
        </p>
      </div>
    </div>
  );
};

export default InteractiveParseTree;
