import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        p-4 transition-all duration-200 overflow-hidden
        ${onClick ? 'cursor-pointer hover:shadow-md active:scale-[0.99]' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;