"use client"

import { useState, useTransition } from "react"
import { updateApplicationStatus, ApplicationStatus } from "@/app/actions/admin"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Check, X, Clock, Mail, Phone, CalendarDays } from "lucide-react"

type ApplicationListProps = {
  initialApplications: any[]
}

export function ApplicationList({ initialApplications }: ApplicationListProps) {
  const [applications, setApplications] = useState(initialApplications)
  const [filter, setFilter] = useState<ApplicationStatus | "ALL">("ALL")
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const filteredApplications = applications.filter(app => filter === "ALL" ? true : app.status === filter)

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    setErrorMsg(null)
    startTransition(async () => {
      const res = await updateApplicationStatus(id, newStatus)
      if (res.success && res.data) {
        // Durumu lokal state üzerinde de güncelle
        setApplications(prev => 
          prev.map(app => 
            app.id === id ? { ...app, status: res.data.status } : app
          )
        )
      } else {
        setErrorMsg(res.error || "Bir hata oluştu.")
        // Hata mesajını 5 saniye sonra sil
        setTimeout(() => setErrorMsg(null), 5000)
      }
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold rounded-sm border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"><Check className="w-3 h-3"/> ONAYLANDI</span>
      case "REJECTED":
        return <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded-sm border border-red-200 dark:border-red-800 flex items-center gap-1"><X className="w-3 h-3"/> REDDEDİLDİ</span>
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold rounded-sm border border-amber-200 dark:border-amber-800 flex items-center gap-1"><Clock className="w-3 h-3"/> BEKLİYOR</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Hata Bildirimi */}
      {errorMsg && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-500 text-red-800 dark:text-red-400 rounded-sm font-semibold flex justify-between items-center animate-in slide-in-from-top-2">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)}><X className="w-5 h-5"/></button>
        </div>
      )}

      {/* Filtreler */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-300 dark:border-slate-700/50 pb-4">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-semibold rounded-sm transition-colors border-2 ${
              filter === f 
                ? "bg-foreground text-background border-foreground" 
                : "bg-transparent text-foreground border-slate-300 dark:border-slate-700 hover:border-foreground/50"
            }`}
          >
            {f === "ALL" ? "Tümü" : f === "PENDING" ? "Bekleyenler" : f === "APPROVED" ? "Onaylananlar" : "Reddedilenler"}
          </button>
        ))}
      </div>

      {/* Liste */}
      {filteredApplications.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-sm text-foreground/60 font-medium">
          Bu kritere uygun başvuru bulunmamaktadır.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredApplications.map(app => (
            <Card key={app.id} className={`p-5 transition-opacity ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                {/* Aday ve Kurs Bilgileri */}
                <div className="flex-grow space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-foreground">
                      {app.applicant.firstName} {app.applicant.lastName}
                    </h3>
                    {getStatusBadge(app.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm font-medium text-foreground/80">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/50">TC:</span> {app.applicant.tcIdentity}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-foreground/50" /> {app.applicant.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-foreground/50" /> {app.applicant.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-foreground/50" /> 
                      Kurs: <span className="font-bold text-primary">{app.course.title}</span>
                    </div>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                {app.status === "PENDING" && (
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-300 dark:border-slate-700 pt-4 md:pt-0 md:pl-4">
                    <Button 
                      size="sm" 
                      className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-sm w-full md:w-32"
                      onClick={() => handleStatusChange(app.id, "APPROVED")}
                    >
                      Onayla
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-red-700 hover:bg-red-800 text-white rounded-sm w-full md:w-32"
                      onClick={() => handleStatusChange(app.id, "REJECTED")}
                    >
                      Reddet
                    </Button>
                  </div>
                )}
                
                {app.status !== "PENDING" && (
                   <div className="text-xs font-semibold text-foreground/50 flex flex-col items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-300 dark:border-slate-700 pt-4 md:pt-0 md:pl-4">
                     <span>İşlem Tarihi:</span>
                     <span>{new Date(app.updatedAt).toLocaleDateString('tr-TR')}</span>
                   </div>
                )}

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
