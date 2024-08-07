import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium text-white';
    const variantClasses = {
      primary: 'bg-primary hover:bg-primary/80',
      secondary: 'bg-secondary hover:bg-secondary/80',
      accent: 'bg-accent hover:bg-accent/80',
    };
  
    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  
};