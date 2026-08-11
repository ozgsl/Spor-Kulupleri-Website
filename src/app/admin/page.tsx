import { getApplications } from "@/app/actions/admin"
import { ApplicationList } from "@/components/admin/ApplicationList"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const response = await getApplications()
  const applications = response.success ? response.data || [] : []

  // Basit İstatistikler
  const total = applications.length
  const pending = applications.filter(a => a.status === "PENDING").length
  const approved = applications.filter(a => a.status === "APPROVED").length

  return (
    <main className="min-h-screen flex flex-col p-6 lg:p-12 bg-background relative overflow-hidden">
      
      {/* Navigation */}
      <nav className="relative z-10 mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-200 bg-transparent text-foreground hover:bg-foreground/10 px-4 py-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Ana Sayfaya Dön
        </Link>
      </nav>

      {/* Header */}
      <div className="relative z-10 mb-10 max-w-7xl w-full mx-auto">
        <div className="border-b border-slate-300 dark:border-slate-700/50 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-foreground">
              Yönetici Paneli
            </h1>
            <p className="text-lg text-foreground/80 font-medium">
              Sisteme düşen tüm başvuruları inceleyin ve onay/red durumlarını belirleyin.
            </p>
          </div>
          
          {/* İstatistikler */}
          <div className="flex gap-4">
            <div className="bg-white dark:bg-[#1f1610] border border-slate-300 dark:border-[#38281d] rounded-sm p-4 text-center min-w-[100px]">
              <div className="text-3xl font-bold text-primary">{pending}</div>
              <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Bekleyen</div>
            </div>
            <div className="bg-white dark:bg-[#1f1610] border border-slate-300 dark:border-[#38281d] rounded-sm p-4 text-center min-w-[100px]">
              <div className="text-3xl font-bold text-emerald-600">{approved}</div>
              <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Onaylanan</div>
            </div>
            <div className="bg-white dark:bg-[#1f1610] border border-slate-300 dark:border-[#38281d] rounded-sm p-4 text-center min-w-[100px]">
              <div className="text-3xl font-bold text-foreground">{total}</div>
              <div className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Toplam</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <ApplicationList initialApplications={applications} />
      </div>
    </main>
  )
}
