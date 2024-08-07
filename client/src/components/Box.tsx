import React, { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-base-100 p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};