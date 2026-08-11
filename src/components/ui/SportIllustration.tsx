"use client"

import React, { useState } from 'react'
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
    <div className={`relative flex items-center justify-center w-24 h-24 ${className}`}>
      {!imgError ? (
        <div className="w-full h-full flex items-center justify-center overflow-hidden p-2">
          <img 
            src={imagePath} 
            alt={`${sportType} illustration`} 
            className="w-full h-full object-contain filter grayscale contrast-125 sepia-[0.3]"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        // Minimal Retro Fallback
        <div className="w-full h-full flex items-center justify-center border-2 border-foreground bg-background rounded-sm">
          {getFallbackIcon()}
        </div>
      )}
    </div>
  )
  )
}
