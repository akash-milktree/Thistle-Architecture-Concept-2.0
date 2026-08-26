"use client";

import React from 'react';
import { motion } from 'framer-motion';

// framer-motion declares its own drag, animation and transition handlers with
// signatures that do not match React's DOM ones, so those names are dropped
// before the rest are forwarded to motion.button. None of them is used on a
// Button; everything else (aria-*, data-*, id, name, form) passes through.
type MotionConflicting =
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onTransitionEnd';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionConflicting> {
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
  onClick,
  disabled,
  type,
  ...rest
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full tracking-tight";
  
  const variants = {
    primary: "bg-thistle-black text-white hover:bg-thistle-green hover:text-thistle-black border border-transparent",
    secondary: "bg-thistle-green text-thistle-black hover:bg-thistle-black hover:text-white border border-transparent",
    outline: "bg-transparent text-thistle-black border border-thistle-black/20 hover:border-thistle-black hover:bg-thistle-green/10",
    glass: "bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/40 hover:text-white"
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
      onClick={onClick}
      disabled={disabled}
      type={type}
      // `rest` was destructured but never applied, so every passthrough
      // attribute was silently dropped: aria-*, id, name, and the
      // `data-tina-field` markers the CMS needs to resolve a click to a field.
      // TypeScript could not catch it because ButtonProps extends
      // ButtonHTMLAttributes, so the call sites always type-checked.
      {...rest}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};