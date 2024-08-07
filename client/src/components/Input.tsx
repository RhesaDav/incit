import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }
  

const Input:React.FC<InputProps> = ({label, ...props}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-3 py-2 text-white bg-base-50 border border-neutral rounded-md focus:text-white focus:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}

export default Input