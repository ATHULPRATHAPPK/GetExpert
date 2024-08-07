// src/components/Spinner.tsx
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-orange-500"></div>
    </div>
  );
};

export default Spinner;
