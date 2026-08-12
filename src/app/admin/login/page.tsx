"use client"

import { useState } from "react"
import { adminLogin } from "@/app/actions/auth"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const res = await adminLogin(formData)
    
    if (res.success) {
      router.push("/admin")
    } else {
      setError(res.error || "Giriş başarısız.")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative">
      <Link 
        href="/" 
        className="absolute top-8 left-8 inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-200 bg-transparent text-foreground hover:bg-foreground/10 px-4 py-2 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Ana Sayfaya Dön
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-foreground text-background mx-auto flex items-center justify-center rounded-sm mb-4 shadow-[4px_4px_0_0_rgba(217,119,6,0.2)]">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">Yönetici Girişi</h1>
          <p className="text-foreground/70 font-medium mt-2">Devam etmek için lütfen kimliğinizi doğrulayın.</p>
        </div>

        <Card className="border-2 border-foreground bg-white dark:bg-[#1f1610] p-8 shadow-[8px_8px_0_0_#18110c]">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 border-2 border-red-500 rounded-sm font-semibold text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground block">E-Posta Adresi</label>
              <input 
                type="email" 
                name="email"
                required
                className="w-full px-4 py-3 rounded-sm bg-transparent border-2 border-slate-300 dark:border-slate-700 focus:border-foreground outline-none transition-colors font-medium text-foreground"
                placeholder="admin@kurs.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground block">Şifre</label>
              <input 
                type="password" 
                name="password"
                required
                className="w-full px-4 py-3 rounded-sm bg-transparent border-2 border-slate-300 dark:border-slate-700 focus:border-foreground outline-none transition-colors font-medium text-foreground"
                placeholder="••••••••"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 text-lg font-bold bg-foreground text-background border-2 border-foreground hover:bg-transparent hover:text-foreground transition-all"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}
