import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Zap } from 'lucide-react';

const InteractiveDerivation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const derivationSteps = [
    { 
      step: 'S', 
      rule: 'Initial symbol', 
      explanation: 'Start with the start symbol S',
      highlight: null
    },
    { 
      step: '( S )', 
      rule: 'S → ( S )', 
      explanation: 'Apply production: S derives to ( S )',
      highlight: 'S'
    },
    { 
      step: '( ( S ) )', 
      rule: 'S → ( S )', 
      explanation: 'Apply the same production again to the inner S',
      highlight: 'S'
    },
    { 
      step: '( ( ) )', 
      rule: 'S → ε', 
      explanation: 'Replace S with empty string (ε)',
      highlight: 'S'
    },
    { 
      step: 'COMPLETE', 
      rule: 'Final String: (())', 
      explanation: 'Derivation complete! We generated balanced parentheses.',
      highlight: null
    }
  ];

  React.useEffect(() => {
    let interval;
    if (isPlaying && currentStep < derivationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= derivationSteps.length - 1) {
            setIsPlaying(false);
          }
          return next;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, speed, derivationSteps.length]);

  const nextStep = () => {
    if (currentStep < derivationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStep === derivationSteps.length - 1) {
      reset();
    }
    setIsPlaying(!isPlaying);
  };

  const current = derivationSteps[currentStep];

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-text-primary flex items-center">
          <Zap className="mr-2 text-accent-400" size={28} />
          Interactive Derivation Steps
        </h3>
        
        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Speed:</span>
          <button
            onClick={() => setSpeed(1500)}
            className={`px-3 py-1 rounded text-sm transition-all ${
              speed === 1500 
                ? 'bg-primary-500 text-white' 
                : 'glass text-text-secondary hover:bg-primary-500/20'
            }`}
          >
            Slow
          </button>
          <button
            onClick={() => setSpeed(1000)}
            className={`px-3 py-1 rounded text-sm transition-all ${
              speed === 1000 
                ? 'bg-primary-500 text-white' 
                : 'glass text-text-secondary hover:bg-primary-500/20'
            }`}
          >
            Normal
          </button>
          <button
            onClick={() => setSpeed(500)}
            className={`px-3 py-1 rounded text-sm transition-all ${
              speed === 500 
                ? 'bg-primary-500 text-white' 
                : 'glass text-text-secondary hover:bg-primary-500/20'
            }`}
          >
            Fast
          </button>
        </div>
      </div>

      {/* Derivation Display */}
      <div className="mb-6">
        <div className="glass rounded-xl p-8 min-h-[200px] flex flex-col items-center justify-center border-glow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {current.step !== 'COMPLETE' ? (
                <div className="font-mono text-5xl text-accent-400 mb-4 tracking-wider">
                  {current.step}
                </div>
              ) : (
                <div className="text-5xl text-accent-400 mb-4">
                  ✓ (())
                </div>
              )}
              
              <div className="glass-dark rounded-lg p-4 mt-4 max-w-md">
                <p className="text-primary-400 font-semibold mb-2">{current.rule}</p>
                <p className="text-text-secondary text-sm">{current.explanation}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          {derivationSteps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'w-8 bg-accent-400 shadow-glow' 
                  : index < currentStep
                  ? 'w-2 bg-primary-400'
                  : 'w-2 bg-primary-500/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <motion.button
          onClick={reset}
          className="glass-dark px-4 py-3 rounded-lg hover-glow transition-all flex items-center space-x-2 border-glow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep === 0}
        >
          <RotateCcw size={20} className="text-text-primary" />
          <span className="text-text-primary font-semibold">Reset</span>
        </motion.button>

        <motion.button
          onClick={prevStep}
          className="glass-dark p-3 rounded-lg hover-glow transition-all border-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentStep === 0}
        >
          <SkipBack size={24} className={currentStep === 0 ? 'text-text-secondary opacity-50' : 'text-accent-400'} />
        </motion.button>

        <motion.button
          onClick={togglePlay}
          className="bg-gradient-to-r from-primary-500 to-accent-400 px-8 py-4 rounded-lg shadow-glow hover:shadow-xl transition-all flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <>
              <Pause size={24} className="text-white" />
              <span className="text-white font-bold">Pause</span>
            </>
          ) : (
            <>
              <Play size={24} className="text-white" />
              <span className="text-white font-bold">
                {currentStep === derivationSteps.length - 1 ? 'Replay' : 'Play'}
              </span>
            </>
          )}
        </motion.button>

        <motion.button
          onClick={nextStep}
          className="glass-dark p-3 rounded-lg hover-glow transition-all border-glow"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={currentStep === derivationSteps.length - 1}
        >
          <SkipForward 
            size={24} 
            className={currentStep === derivationSteps.length - 1 ? 'text-text-secondary opacity-50' : 'text-accent-400'} 
          />
        </motion.button>
      </div>

      {/* Step Counter */}
      <div className="mt-6 text-center">
        <span className="text-text-secondary text-sm">
          Step {currentStep + 1} of {derivationSteps.length}
        </span>
      </div>

      {/* Grammar Reference */}
      <div className="mt-6 glass rounded-lg p-4 border-glow">
        <h4 className="text-sm font-semibold text-primary-400 mb-2">Grammar Rules:</h4>
        <div className="font-mono text-sm text-text-secondary space-y-1">
          <div>S → ( S )</div>
          <div>S → ε</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDerivation;
