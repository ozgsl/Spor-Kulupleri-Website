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
  // Vintage flat web style
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-200'
  
  const variants = {
    primary: 'bg-foreground text-background hover:opacity-90',
    secondary: 'bg-secondary text-foreground hover:opacity-90',
    outline: 'border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/10'
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
