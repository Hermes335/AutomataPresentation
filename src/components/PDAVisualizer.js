import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

const PDAVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Example: Recognize a^n b^n using PDA
  const steps = [
    {
      state: 'q0',
      input: 'aabb',
      position: 0,
      stack: ['Z'],
      action: 'Start - Initial state with Z on stack',
      transition: 'δ(q0, a, Z) = (q0, AZ)'
    },
    {
      state: 'q0',
      input: 'aabb',
      position: 1,
      stack: ['Z', 'A'],
      action: 'Read "a", push A onto stack',
      transition: 'δ(q0, a, A) = (q0, AA)'
    },
    {
      state: 'q0',
      input: 'aabb',
      position: 2,
      stack: ['Z', 'A', 'A'],
      action: 'Read "a", push A onto stack',
      transition: 'δ(q0, b, A) = (q1, ε)'
    },
    {
      state: 'q1',
      input: 'aabb',
      position: 3,
      stack: ['Z', 'A'],
      action: 'Read "b", pop A from stack',
      transition: 'δ(q1, b, A) = (q1, ε)'
    },
    {
      state: 'q1',
      input: 'aabb',
      position: 4,
      stack: ['Z'],
      action: 'Read "b", pop A from stack',
      transition: 'δ(q1, ε, Z) = (q2, Z)'
    },
    {
      state: 'q2',
      input: 'aabb',
      position: 4,
      stack: ['Z'],
      action: 'Accept - Input exhausted, Z remains',
      transition: 'String accepted! ✓'
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="glass-dark rounded-2xl shadow-glow p-8 border-glow">
      <h3 className="text-3xl font-semibold text-text-primary mb-4 text-center">
        Pushdown Automaton Visualizer
      </h3>
      <p className="text-text-secondary text-center mb-6">
        Watch how a PDA recognizes the language L = {'{'}a<sup>n</sup>b<sup>n</sup> | n ≥ 0{'}'}
      </p>

      {/* PDA Diagram */}
      <div className="glass rounded-xl p-6 mb-6 border-glow">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Current State */}
          <div className="text-center">
            <h4 className="text-sm font-semibold text-primary-400 mb-3">Current State</h4>
            <motion.div
              key={currentStepData.state}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold border-4 ${
                currentStepData.state === 'q2' 
                  ? 'border-green-400 text-green-400 bg-green-400/20' 
                  : 'border-accent-400 text-accent-400 bg-accent-400/20'
              }`}
            >
              {currentStepData.state}
            </motion.div>
            {currentStepData.state === 'q2' && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 text-sm mt-2 font-semibold"
              >
                Accepting State
              </motion.p>
            )}
          </div>

          {/* Input Tape */}
          <div>
            <h4 className="text-sm font-semibold text-primary-400 mb-3 text-center">Input Tape</h4>
            <div className="flex justify-center items-center gap-1">
              {currentStepData.input.split('').map((char, idx) => (
                <motion.div
                  key={idx}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded font-mono text-lg ${
                    idx < currentStepData.position
                      ? 'border-green-400/50 text-green-400 bg-green-400/10'
                      : idx === currentStepData.position
                      ? 'border-accent-400 text-accent-400 bg-accent-400/20 shadow-glow'
                      : 'border-primary-500/50 text-text-secondary bg-primary-500/10'
                  }`}
                  animate={idx === currentStepData.position ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {char}
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <ChevronRight 
                className="text-accent-400" 
                size={24} 
                style={{ marginLeft: `${currentStepData.position * 52}px`, transition: 'margin-left 0.5s' }}
              />
            </div>
          </div>

          {/* Stack */}
          <div>
            <h4 className="text-sm font-semibold text-primary-400 mb-3 text-center">Stack (Top → Bottom)</h4>
            <div className="flex flex-col items-center gap-1 min-h-[100px]">
              <AnimatePresence>
                {[...currentStepData.stack].reverse().map((symbol, idx) => (
                  <motion.div
                    key={`${symbol}-${idx}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`w-16 h-12 flex items-center justify-center border-2 rounded font-mono text-lg ${
                      idx === 0
                        ? 'border-accent-400 text-accent-400 bg-accent-400/20 shadow-glow'
                        : 'border-primary-500/50 text-text-secondary bg-primary-500/10'
                    }`}
                  >
                    {symbol}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <p className="text-xs text-text-muted text-center mt-2">
              Height: {currentStepData.stack.length}
            </p>
          </div>
        </div>

        {/* Transition Information */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 glass rounded-lg border-glow"
        >
          <p className="text-text-primary font-semibold mb-2">{currentStepData.action}</p>
          <p className="text-sm font-mono text-accent-400">{currentStepData.transition}</p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-muted">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-text-muted">
            Progress: {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="flex gap-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`flex-1 h-2 rounded-full transition-all ${
                idx <= currentStep ? 'bg-accent-400' : 'bg-primary-500/30'
              } ${idx === currentStep ? 'h-3' : 'h-2'}`}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={reset}
          className="glass-button px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-500/20 transition-all"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
        
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="glass-button px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500/20 transition-all"
        >
          Previous
        </button>

        <button
          onClick={togglePlay}
          className="glass-button px-6 py-3 rounded-lg flex items-center gap-2 bg-accent-400/20 hover:bg-accent-400/30 transition-all shadow-glow"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          <span className="font-semibold">{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep >= steps.length - 1}
          className="glass-button px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500/20 transition-all"
        >
          Next
        </button>
      </div>

      {/* Grammar Reference */}
      <div className="mt-6 p-4 glass rounded-lg border-glow">
        <h4 className="text-sm font-semibold text-primary-400 mb-2">PDA Configuration for L = {'{'}a<sup>n</sup>b<sup>n</sup>{'}'}</h4>
        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono text-text-secondary">
          <div>
            <p className="text-text-muted mb-1">States:</p>
            <p>Q = {'{'}q0, q1, q2{'}'}</p>
          </div>
          <div>
            <p className="text-text-muted mb-1">Transitions:</p>
            <p>δ(q0, a, Z) = (q0, AZ)</p>
            <p>δ(q0, a, A) = (q0, AA)</p>
            <p>δ(q0, b, A) = (q1, ε)</p>
            <p>δ(q1, b, A) = (q1, ε)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDAVisualizer;
