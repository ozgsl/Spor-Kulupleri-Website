"use client"

import { useState, useTransition } from "react"
import { createTrainer } from "@/app/actions/admin"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export function TrainerForm() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success'|'error', text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      branch: formData.get("branch") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    }

    startTransition(async () => {
      const res = await createTrainer(data)
      if (res.success) {
        setMessage({ type: 'success', text: "Eğitmen başarıyla eklendi!" })
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage({ type: 'error', text: res.error || "Hata oluştu" })
      }
      setTimeout(() => setMessage(null), 5000)
    })
  }

  return (
    <Card className="max-w-2xl mx-auto border-2 border-foreground bg-background">
      <h3 className="text-xl font-bold mb-4 text-foreground border-b-2 border-foreground pb-2">Yeni Eğitmen Ekle</h3>
      
      {message && (
        <div className={`p-3 mb-4 font-semibold text-sm rounded-sm border-2 ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800 border-emerald-500' : 'bg-red-100 text-red-800 border-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Ad</label>
            <input required name="firstName" type="text" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Soyad</label>
            <input required name="lastName" type="text" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-foreground mb-1">Branş</label>
          <input required name="branch" type="text" placeholder="Örn: Yüzme, Tenis" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Telefon</label>
            <input name="phone" type="tel" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">E-posta</label>
            <input required name="email" type="email" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent text-foreground rounded-sm focus:border-foreground outline-none transition-colors" />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full mt-4 py-3 bg-foreground text-background font-bold border-2 border-foreground hover:bg-transparent hover:text-foreground">
          {isPending ? "Ekleniyor..." : "Eğitmen Kaydet"}
        </Button>
      </form>
    </Card>
  )
}
