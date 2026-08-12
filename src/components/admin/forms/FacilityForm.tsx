"use client"

import { useState, useTransition } from "react"
import { createFacility } from "@/app/actions/admin"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export function FacilityForm() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success'|'error', text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      capacity: parseInt(formData.get("capacity") as string, 10),
      location: formData.get("location") as string,
    }

    startTransition(async () => {
      const res = await createFacility(data)
      if (res.success) {
        setMessage({ type: 'success', text: "Tesis başarıyla eklendi!" })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage({ type: 'error', text: res.error || "Hata oluştu" })
      }
      setTimeout(() => setMessage(null), 5000)
    })
  }

  return (
    <Card className="max-w-2xl mx-auto border-2 border-foreground bg-background">
      <h3 className="text-xl font-bold mb-4 text-foreground border-b-2 border-foreground pb-2">Yeni Tesis / Salon Ekle</h3>
      
      {message && (
        <div className={`p-3 mb-4 font-semibold text-sm rounded-sm border-2 ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' : 'bg-red-100 text-red-800 border-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-foreground mb-1">Tesis Adı</label>
          <input required name="name" type="text" placeholder="Örn: Merkez Kapalı Spor Salonu" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Tesis Tipi</label>
            <input required name="type" type="text" placeholder="Örn: Havuz, Kort, Saha" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Maksimum Kapasite</label>
            <input required name="capacity" type="number" min="1" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-1">Konum (Opsiyonel)</label>
          <input name="location" type="text" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
        </div>
        
        <Button type="submit" disabled={isPending} className="w-full mt-4 py-3 bg-foreground text-background font-bold border-2 border-foreground hover:bg-transparent hover:text-foreground">
          {isPending ? "Ekleniyor..." : "Tesis Kaydet"}
        </Button>
      </form>
    </Card>
  )
}
