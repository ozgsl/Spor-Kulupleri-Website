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
              className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${isFull ? 'opacity-50 cursor-not-allowed bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700' : 'hover:border-primary/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:bg-primary/10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}
            >
              <input 
                type="radio" 
                name="courseId" 
                value={course.id} 
                disabled={isFull}
                className="w-5 h-5 text-primary border-slate-300 focus:ring-primary"
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
         <p className="text-slate-500 text-sm font-medium p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">Şu an aktif bir kurs bulunmamaktadır.</p>
      )}
      {error && <p className="text-red-500 text-xs ml-1 font-medium">{error}</p>}
    </div>
  )
}
