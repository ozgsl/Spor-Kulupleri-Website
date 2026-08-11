import React from "react"

export type CourseData = {
  id: string
  title: string
  sportType: string
  quota: number
  available: number
}

interface CourseSelectCardProps {
  courses: CourseData[]
  error?: string
}

export function CourseSelectCard({ courses, error }: CourseSelectCardProps) {
  return (
    <div className="space-y-2 pt-4">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Kurs Seçimi</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => {
          const isFull = course.available <= 0
          return (
            <label 
              key={course.id} 
              className={`relative flex items-center p-4 rounded-sm border cursor-pointer transition-colors ${isFull ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700' : 'hover:border-foreground/50 has-[:checked]:border-foreground has-[:checked]:bg-foreground/5 dark:has-[:checked]:bg-foreground/10 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#3d2f28]'}`}
            >
              <input 
                type="radio" 
                name="courseId" 
                value={course.id} 
                disabled={isFull}
                className="w-5 h-5 text-foreground border-slate-400 focus:ring-foreground accent-foreground"
                required
              />
              <div className="ml-3 flex-grow">
                <p className="font-bold text-slate-800 dark:text-slate-100">{course.title}</p>
                <p className="text-xs text-slate-500 font-medium">
                  {isFull ? 'Kontenjan Doldu' : `Kalan Kontenjan: ${course.available}`}
                </p>
              </div>
            </label>
          )
        })}
      </div>
      {courses.length === 0 && (
         <p className="text-foreground/60 text-sm font-medium p-4 bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 rounded-sm">Şu an aktif bir kurs bulunmamaktadır.</p>
      )}
      {error && <p className="text-red-500 text-xs ml-1 font-medium">{error}</p>}
    </div>
  )
}
