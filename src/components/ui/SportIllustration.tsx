"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Dumbbell, Trophy, Target } from 'lucide-react'

export type SportType = 'basketball' | 'swimming' | 'football' | 'tennis' | 'volleyball' | 'general'

interface SportIllustrationProps {
  sportType: SportType
  className?: string
}

export function SportIllustration({ sportType, className = '' }: SportIllustrationProps) {
  const [imgError, setImgError] = useState(false)
  const imagePath = `/illustrations/${sportType}.png`
  
  const getFallbackIcon = () => {
    switch (sportType) {
      case 'basketball':
      case 'football':
      case 'volleyball':
        return <Activity className="w-12 h-12 text-primary" />
      case 'swimming':
      case 'tennis':
        return <Target className="w-12 h-12 text-secondary" />
      default:
        return <Dumbbell className="w-12 h-12 text-slate-400 dark:text-slate-500" />
    }
  }

  return (
    <motion.div 
      className={`relative flex items-center justify-center w-24 h-24 ${className}`}
      whileHover={{ scale: 1.08, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {!imgError ? (
        <div className="w-full h-full rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center overflow-hidden p-2 shadow-sm border border-emerald-200 dark:border-emerald-800">
          <img 
            src={imagePath} 
            alt={`${sportType} illustration`} 
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        // Minimal Gamified Fallback
        <div className="w-full h-full rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shadow-sm relative overflow-hidden group border border-emerald-200 dark:border-emerald-800">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 to-amber-200/50" />
          <motion.div 
            animate={{ y: [0, -5, 0] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            {getFallbackIcon()}
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
