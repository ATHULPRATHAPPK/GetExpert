// src/components/LinearLoader.tsx
import React from 'react';

const LinearLoader: React.FC = () => {
  return (
    <div className="w-full fixed top-0 left-0">
      <div className="h-1 bg-blue-500 animate-pulse"></div>
    </div>
  );
};

export default LinearLoader;
