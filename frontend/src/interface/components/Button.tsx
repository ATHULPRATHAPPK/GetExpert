import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, className, onClick }) => {
  return (
    <button 
      className={`bg-orange-500 text-white py-2 px-4 rounded ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
