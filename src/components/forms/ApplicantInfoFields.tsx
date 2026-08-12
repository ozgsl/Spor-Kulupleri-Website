"use client"

import React, { useState } from "react"

interface ApplicantInfoFieldsProps {
  errors?: Record<string, string[]>
}

export function ApplicantInfoFields({ errors }: ApplicantInfoFieldsProps) {
  const [phone, setPhone] = useState("")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sadece rakamları al
    let val = e.target.value.replace(/\D/g, "")
    
    // Kullanıcı silmeye çalışırsa ve boş kalırsa veya 0 ile başlamıyorsa düzelt
    if (val.length > 0 && !val.startsWith("0")) {
      val = "0" + val
    }
    if (val.length > 1 && !val.startsWith("05")) {
      val = "05" + val.substring(2)
    }

    // Formatlama: 05XX XXX XX XX
    let formatted = val.substring(0, 4)
    if (val.length > 4) formatted += " " + val.substring(4, 7)
    if (val.length > 7) formatted += " " + val.substring(7, 9)
    if (val.length > 9) formatted += " " + val.substring(9, 11)
    
    setPhone(formatted)
  }

  // Tarih Sınırları Hesaplama
  const today = new Date()
  
  // En az 4 yaşında (Maksimum seçilebilecek tarih)
  const maxDate = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate())
  const maxDateStr = maxDate.toISOString().split("T")[0]
  
  // En fazla 150 yaşında (Minimum seçilebilecek tarih)
  const minDate = new Date(today.getFullYear() - 150, today.getMonth(), today.getDate())
  const minDateStr = minDate.toISOString().split("T")[0]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adınız</label>
        <input 
          type="text" 
          name="firstName" 
          required
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground placeholder:text-slate-400"
          placeholder="Örn: Ali"
        />
        {errors?.firstName && <p className="text-red-500 text-xs ml-1 font-medium">{errors.firstName[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Soyadınız</label>
        <input 
          type="text" 
          name="lastName" 
          required
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground placeholder:text-slate-400"
          placeholder="Örn: Yılmaz"
        />
        {errors?.lastName && <p className="text-red-500 text-xs ml-1 font-medium">{errors.lastName[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">T.C. Kimlik No</label>
        <input 
          type="text" 
          name="tcIdentity" 
          required
          maxLength={11}
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground placeholder:text-slate-400"
          placeholder="11 Haneli TC Numaranız"
        />
        {errors?.tcIdentity && <p className="text-red-500 text-xs ml-1 font-medium">{errors.tcIdentity[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Telefon</label>
        <input 
          type="tel" 
          name="phone" 
          required
          value={phone}
          onChange={handlePhoneChange}
          placeholder="05XX XXX XX XX"
          maxLength={14} // 11 rakam + 3 boşluk
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground placeholder:text-slate-400"
        />
        {errors?.phone && <p className="text-red-500 text-xs ml-1 font-medium">{errors.phone[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">E-Posta</label>
        <input 
          type="email" 
          name="email" 
          required
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground placeholder:text-slate-400"
          placeholder="ornek@mail.com"
        />
        {errors?.email && <p className="text-red-500 text-xs ml-1 font-medium">{errors.email[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Doğum Tarihi</label>
        <input 
          type="date" 
          name="birthDate" 
          required
          min={minDateStr}
          max={maxDateStr}
          className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#3d2f28] border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:border-foreground transition-colors font-medium text-foreground"
        />
        {errors?.birthDate && <p className="text-red-500 text-xs ml-1 font-medium">{errors.birthDate[0]}</p>}
      </div>
    </div>
  )
}

