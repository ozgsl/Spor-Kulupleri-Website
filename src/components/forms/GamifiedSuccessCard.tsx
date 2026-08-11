import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface GamifiedSuccessCardProps {
  message: string
}

export function GamifiedSuccessCard({ message }: GamifiedSuccessCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-50/50 dark:bg-emerald-950/20 rounded-sm border-2 border-emerald-600 dark:border-emerald-700">
      <div className="mb-4">
        <CheckCircle className="w-12 h-12 text-emerald-700 dark:text-emerald-500" />
      </div>
      <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">Başvurunuz Alındı</h3>
      <p className="text-emerald-800 dark:text-emerald-500 font-medium mb-6">
        {message}
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>Yeni Başvuru Yap</Button>
    </div>
  )
}
