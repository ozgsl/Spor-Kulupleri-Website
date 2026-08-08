import React from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface GamifiedSuccessCardProps {
  message: string
}

export function GamifiedSuccessCard({ message }: GamifiedSuccessCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-emerald-50 dark:bg-emerald-950/20 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-sm animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Başvurunuz Alındı!</h3>
      <p className="text-emerald-600 dark:text-emerald-500 font-medium mb-6">
        {message}
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>Yeni Başvuru Yap</Button>
    </div>
  )
}
