import React from "react"

interface ApplicantInfoFieldsProps {
  errors?: Record<string, string[]>
}

export function ApplicantInfoFields({ errors }: ApplicantInfoFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adınız</label>
        <input 
          type="text" 
          name="firstName" 
          required
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
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
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
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
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
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
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
          placeholder="05XX XXX XX XX"
        />
        {errors?.phone && <p className="text-red-500 text-xs ml-1 font-medium">{errors.phone[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">E-Posta</label>
        <input 
          type="email" 
          name="email" 
          required
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
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
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-slate-800 dark:text-slate-100"
        />
        {errors?.birthDate && <p className="text-red-500 text-xs ml-1 font-medium">{errors.birthDate[0]}</p>}
      </div>
    </div>
  )
}
