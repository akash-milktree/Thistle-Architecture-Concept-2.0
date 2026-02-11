import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full tracking-tight";
  
  const variants = {
    primary: "bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black border border-transparent",
    secondary: "bg-thistle-pink text-thistle-black hover:bg-thistle-green hover:text-white border border-transparent",
    outline: "bg-transparent text-thistle-black border border-thistle-black/20 hover:border-thistle-black hover:bg-thistle-pink/10",
    glass: "bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-thistle-pink/50 hover:text-thistle-pink"
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};