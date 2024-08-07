import React from 'react';

interface ErrorTextProps {
  message: string;
}

export const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
  return (
    <p className="text-sm text-error mt-1">{message}</p>
  );
};