import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean
  children: React.ReactNode
}

export function Card({ hoverEffect = false, className = '', children, ...props }: CardProps) {
  const baseStyles = 'p-6 sm:p-8 flex flex-col relative overflow-hidden bg-white dark:bg-[#1f1610] rounded-sm border border-slate-300 dark:border-[#38281d]'
  const hoverStyles = hoverEffect ? 'transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]' : ''
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`} {...props}>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
