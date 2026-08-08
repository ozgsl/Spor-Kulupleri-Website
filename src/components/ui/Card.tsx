import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
  children: React.ReactNode
}

export function Card({ hoverEffect = false, className = '', children, ...props }: CardProps) {
  const baseStyles = 'p-6 sm:p-8 flex flex-col relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none'
  const hoverStyles = hoverEffect ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
