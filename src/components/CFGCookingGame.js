import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Check, X, RotateCcw, Trophy } from 'lucide-react';

const CFGCookingGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [slots, setSlots] = useState([null, null, null, null, null]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  const recipes = [
    {
      name: "Grilled Chicken with Rice",
      sequence: ["Chicken", "Grill", "Rice"],
      optional: [],
      rulePattern: "Meat → Cook → Side",
      difficulty: "Easy"
    },
    {
      name: "Marinated Grilled Beef with Fries",
      sequence: ["Beef", "Marinate", "Grill", "Fries"],
      optional: [],
      rulePattern: "Meat → Prep → Cook → Side",
      difficulty: "Easy"
    },
    {
      name: "Seasoned Baked Fish with Vegetables and Cheese",
      sequence: ["Fish", "Season", "Bake", "Vegetables", "Cheese"],
      optional: [],
      rulePattern: "Meat → Prep → Cook → Side → Sauce",
      difficulty: "Medium"
    },
    {
      name: "Coated Fried Chicken with Salad",
      sequence: ["Chicken", "Coat", "Fry", "Salad"],
      optional: [],
      rulePattern: "Meat → Prep → Cook → Side",
      difficulty: "Medium"
    },
    {
      name: "Steamed Pork with Rice and BBQ Sauce",
      sequence: ["Pork", "Steam", "Rice", "BBQ"],
      optional: ["BBQ"],
      rulePattern: "Meat → Cook → Side → Sauce?",
      difficulty: "Medium"
    },
    {
      name: "Marinated Boiled Beef with Vegetables and Ketchup",
      sequence: ["Beef", "Marinate", "Boil", "Vegetables", "Ketchup"],
      optional: ["Ketchup"],
      rulePattern: "Meat → Prep → Cook → Side → Sauce?",
      difficulty: "Hard"
    },
    {
      name: "Seasoned Grilled Fish with Fries and Spicy Sauce",
      sequence: ["Fish", "Season", "Grill", "Fries", "Spicy Sauce"],
      optional: [],
      rulePattern: "Meat → Prep → Cook → Side → Sauce",
      difficulty: "Hard"
    }
  ];

  const availableCards = {
    meat: ["Chicken", "Beef", "Pork", "Fish", "Lamb", "Turkey", "Duck", "Shrimp"],
    prep: ["Marinate", "Season", "Coat", "Slice", "Dice", "Chop", "Tenderize"],
    cooking: ["Grill", "Fry", "Bake", "Steam", "Boil", "Roast", "Sauté", "Broil"],
    side: ["Rice", "Fries", "Salad", "Vegetables", "Pasta", "Bread", "Mashed Potatoes", "Coleslaw"],
    sauce: ["Spicy Sauce", "Ketchup", "BBQ", "Cheese", "Gravy", "Teriyaki", "Mustard", "Mayo"]
  };

  const currentRecipe = recipes[currentLevel];

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (slotIndex) => {
    if (draggedItem && !slots[slotIndex]) {
      const newSlots = [...slots];
      newSlots[slotIndex] = draggedItem;
      setSlots(newSlots);
      setDraggedItem(null);
      setFeedback(null);
    }
  };

  const handleRemoveFromSlot = (slotIndex) => {
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
    setFeedback(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkSolution = () => {
    const filledSlots = slots.filter(slot => slot !== null);
    const requiredSequence = currentRecipe.sequence.filter(
      item => !currentRecipe.optional.includes(item)
    );

    // Check if all required items are present
    const hasAllRequired = requiredSequence.every(item => filledSlots.includes(item));
    
    // Check order
    const currentSequence = filledSlots.join(' → ');
    const correctSequence = currentRecipe.sequence.join(' → ');
    const correctSequenceWithoutOptional = requiredSequence.join(' → ');

    if (currentSequence === correctSequence || currentSequence === correctSequenceWithoutOptional) {
      setFeedback({
        type: 'success',
        message: '🎉 Perfect! Recipe completed correctly!',
        derivation: currentSequence
      });
      setScore(score + (currentRecipe.difficulty === 'Easy' ? 100 : 200));
    } else if (hasAllRequired) {
      setFeedback({
        type: 'error',
        message: '❌ Order is incorrect! Check the CFG rules.',
        hint: 'Remember: Meat → Prep → Cook → Side → Sauce'
      });
    } else {
      setFeedback({
        type: 'error',
        message: '❌ Missing required ingredients!',
        hint: `You need: ${requiredSequence.join(', ')}`
      });
    }
  };

  const resetLevel = () => {
    setSlots([null, null, null, null, null]);
    setFeedback(null);
  };

  const nextLevel = () => {
    if (currentLevel < recipes.length - 1) {
      setCurrentLevel(currentLevel + 1);
      resetLevel();
    }
  };

  const getCategoryColor = (item) => {
    if (availableCards.meat.includes(item)) return 'from-red-500 to-orange-500';
    if (availableCards.prep.includes(item)) return 'from-yellow-500 to-amber-500';
    if (availableCards.cooking.includes(item)) return 'from-purple-500 to-pink-500';
    if (availableCards.side.includes(item)) return 'from-green-500 to-emerald-500';
    if (availableCards.sauce.includes(item)) return 'from-blue-500 to-cyan-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <div className="glass-dark rounded-2xl p-8 shadow-glow border-glow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ChefHat className="mr-3 text-accent-400" size={36} />
          <div>
            <h3 className="text-3xl font-bold text-text-primary">
              CFG Cooking Game
            </h3>
            <p className="text-text-secondary text-sm">
              Learn CFG through interactive cooking challenges!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="glass rounded-lg px-4 py-2">
            <div className="text-accent-400 font-bold text-lg">{score}</div>
            <div className="text-text-muted text-xs">Points</div>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <div className="text-primary-400 font-bold text-lg">
              Level {currentLevel + 1}/{recipes.length}
            </div>
            <div className="text-text-muted text-xs">{currentRecipe.difficulty}</div>
          </div>
        </div>
      </div>

      {/* Recipe Goal */}
      <div className="glass rounded-xl p-6 mb-6 border-glow bg-gradient-to-r from-primary-500/10 to-accent-400/10">
        <h4 className="text-xl font-bold text-primary-400 mb-2">Recipe Goal:</h4>
        <p className="text-2xl font-bold text-text-primary mb-2">{currentRecipe.name}</p>
        <div className="mt-3 glass rounded-lg p-3 border-glow">
          <p className="text-sm text-text-muted mb-1">Rule Pattern:</p>
          <div className="font-mono text-accent-400 text-lg">{currentRecipe.rulePattern}</div>
          <p className="text-xs text-text-muted mt-2">(? = optional)</p>
        </div>
      </div>

      {/* Drop Slots (CFG Derivation Positions) */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-primary-400 mb-3 uppercase tracking-wide">
          Drag ingredients here (in correct CFG order):
        </h4>
        <div className="flex gap-3 flex-wrap">
          {slots.map((slot, index) => (
            <div
              key={index}
              onDrop={() => handleDrop(index)}
              onDragOver={handleDragOver}
              className={`
                relative flex-1 min-w-[180px] h-[100px] rounded-xl border-2 border-dashed
                flex items-center justify-center cursor-pointer transition-all
                ${slot ? 'border-accent-400 bg-accent-400/20' : 'border-primary-500/50 bg-primary-500/5 hover:border-primary-400 hover:bg-primary-500/10'}
              `}
            >
              {slot ? (
                <div className="relative w-full h-full p-3">
                  <div className={`w-full h-full rounded-lg bg-gradient-to-br ${getCategoryColor(slot)} flex items-center justify-center relative`}>
                    <span className="text-white font-bold text-base text-center px-2">{slot}</span>
                    <button
                      onClick={() => handleRemoveFromSlot(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 hover:bg-red-600 transition-all"
                    >
                      <X size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-text-muted text-sm text-center font-semibold">
                  Slot {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Cards */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-primary-400 mb-3 uppercase tracking-wide">
          Available Ingredients:
        </h4>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(availableCards).map(([category, items]) => (
            <div key={category} className="glass rounded-lg p-4">
              <div className="text-sm text-accent-400 font-semibold mb-3 uppercase text-center">
                {category}
              </div>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item}
                    draggable={!slots.includes(item)}
                    onDragStart={() => handleDragStart(item)}
                    className={`
                      rounded-lg p-3 text-center cursor-move transition-all
                      bg-gradient-to-br ${getCategoryColor(item)}
                      ${slots.includes(item) ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105 shadow-lg'}
                    `}
                  >
                    <span className="text-white font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              glass rounded-xl p-4 mb-6 border-2
              ${feedback.type === 'success' ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}
            `}
          >
            <div className="font-bold text-lg mb-2">{feedback.message}</div>
            {feedback.derivation && (
              <div className="font-mono text-sm text-accent-400">
                Derivation: {feedback.derivation}
              </div>
            )}
            {feedback.hint && (
              <div className="text-sm text-text-secondary mt-2">
                💡 {feedback.hint}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={checkSolution}
          className="flex-1 bg-gradient-to-r from-primary-500 to-accent-400 text-white font-bold py-3 px-6 rounded-lg hover:shadow-glow transition-all flex items-center justify-center gap-2"
        >
          <Check size={20} />
          Check Recipe
        </button>
        <button
          onClick={resetLevel}
          className="glass px-6 py-3 rounded-lg text-text-primary hover:bg-primary-500/20 transition-all flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Reset
        </button>
        {feedback?.type === 'success' && currentLevel < recipes.length - 1 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={nextLevel}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-glow transition-all flex items-center gap-2"
          >
            <Trophy size={20} />
            Next Level
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default CFGCookingGame;
