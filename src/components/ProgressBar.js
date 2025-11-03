import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-dark-elevated/50 z-[60]">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-accent-400 to-primary-600 shadow-glow transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
