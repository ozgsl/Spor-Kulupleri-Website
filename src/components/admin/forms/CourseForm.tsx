"use client"

import { useState, useTransition } from "react"
import { createCourse } from "@/app/actions/admin"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

type CourseFormProps = {
  trainers: any[]
  facilities: any[]
}

export function CourseForm({ trainers, facilities }: CourseFormProps) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success'|'error', text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      title: formData.get("title") as string,
      sportType: formData.get("sportType") as string,
      facilityId: formData.get("facilityId") as string,
      trainerId: formData.get("trainerId") as string,
      startDate: new Date(formData.get("startDate") as string),
      endDate: new Date(formData.get("endDate") as string),
      quota: parseInt(formData.get("quota") as string, 10),
    }

    // Basit Validasyon
    if (data.startDate > data.endDate) {
      setMessage({ type: 'error', text: "Bitiş tarihi başlangıç tarihinden önce olamaz." })
      return
    }

    startTransition(async () => {
      const res = await createCourse(data)
      if (res.success) {
        setMessage({ type: 'success', text: "Kurs başarıyla oluşturuldu!" })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage({ type: 'error', text: res.error || "Hata oluştu" })
      }
      setTimeout(() => setMessage(null), 5000)
    })
  }

  return (
    <Card className="max-w-3xl mx-auto border-2 border-foreground bg-background">
      <h3 className="text-xl font-bold mb-4 text-foreground border-b-2 border-foreground pb-2">Yeni Kurs Tanımla</h3>
      
      {message && (
        <div className={`p-3 mb-4 font-semibold text-sm rounded-sm border-2 ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' : 'bg-red-100 text-red-800 border-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Kurs Adı</label>
            <input required name="title" type="text" placeholder="Örn: İleri Seviye Yüzme" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Spor Türü</label>
            <select required name="sportType" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background text-foreground rounded-sm focus:border-foreground outline-none transition-colors">
              <option value="">Seçiniz...</option>
              <option value="basketball">Basketbol</option>
              <option value="football">Futbol</option>
              <option value="swimming">Yüzme</option>
              <option value="tennis">Tenis</option>
              <option value="volleyball">Voleybol</option>
              <option value="general">Genel Spor</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Eğitmen Seçimi</label>
            <select required name="trainerId" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background text-foreground rounded-sm focus:border-foreground outline-none transition-colors">
              <option value="">Eğitmen Seçin...</option>
              {trainers.map(t => (
                <option key={t.id} value={t.id}>{t.firstName} {t.lastName} ({t.branch})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Tesis / Salon Seçimi</label>
            <select required name="facilityId" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background text-foreground rounded-sm focus:border-foreground outline-none transition-colors">
              <option value="">Tesis Seçin...</option>
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} - Kapasite: {f.capacity}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Başlangıç</label>
            <input required name="startDate" type="date" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Bitiş</label>
            <input required name="endDate" type="date" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Kontenjan (Kişi)</label>
            <input required name="quota" type="number" min="1" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full mt-4 py-3 bg-foreground text-background font-bold border-2 border-foreground hover:bg-transparent hover:text-foreground">
          {isPending ? "Ekleniyor..." : "Kursu Oluştur"}
        </Button>
      </form>
    </Card>
  )
}
