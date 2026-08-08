import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  // Gamified bounce effect: active:scale-95 and active:translate-y-1 for the 3D press feel
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-95 active:translate-y-1'
  
  const variants = {
    primary: 'bg-primary text-slate-800 hover:bg-primary-hover shadow-[0_4px_0_0_#22C55E] hover:shadow-[0_2px_0_0_#22C55E] hover:translate-y-[2px]',
    secondary: 'bg-secondary text-slate-800 hover:bg-secondary-hover shadow-[0_4px_0_0_#F59E0B] hover:shadow-[0_2px_0_0_#F59E0B] hover:translate-y-[2px]',
    outline: 'border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary dark:hover:border-primary',
    ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
