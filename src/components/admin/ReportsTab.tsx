"use client"

import { useState } from "react"
import { getApplicantsByDateAndSport, getTrainersBySport, getCoursesByFacility } from "@/app/actions/reports"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

type ReportsTabProps = {
  facilities: any[]
}

export function ReportsTab({ facilities }: ReportsTabProps) {
  // Report 1 State
  const [rep1Data, setRep1Data] = useState<any[] | null>(null)
  const [rep1Loading, setRep1Loading] = useState(false)

  // Report 2 State
  const [rep2Data, setRep2Data] = useState<any[] | null>(null)
  const [rep2Loading, setRep2Loading] = useState(false)

  // Report 3 State
  const [rep3Data, setRep3Data] = useState<any[] | null>(null)
  const [rep3Loading, setRep3Loading] = useState(false)

  const handleRep1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRep1Loading(true)
    const fd = new FormData(e.currentTarget)
    const res = await getApplicantsByDateAndSport(
      new Date(fd.get("startDate") as string),
      new Date(fd.get("endDate") as string),
      fd.get("sportType") as string
    )
    if (res.success) setRep1Data(res.data)
    setRep1Loading(false)
  }

  const handleRep2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRep2Loading(true)
    const fd = new FormData(e.currentTarget)
    const res = await getTrainersBySport(fd.get("sportType") as string)
    if (res.success) setRep2Data(res.data)
    setRep2Loading(false)
  }

  const handleRep3Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setRep3Loading(true)
    const fd = new FormData(e.currentTarget)
    const res = await getCoursesByFacility(fd.get("facilityId") as string)
    if (res.success) setRep3Data(res.data)
    setRep3Loading(false)
  }

  return (
    <div className="space-y-12">
      {/* 1. Sorgu */}
      <Card className="p-6 bg-white dark:bg-[#1a120d] border-2 border-slate-300 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 border-b border-slate-300 dark:border-slate-700 pb-2">1. Tarih ve Spor Türü Bazında Kursiyer Sorgusu</h2>
        <form onSubmit={handleRep1Submit} className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="w-full">
            <label className="block text-sm font-bold text-foreground mb-1">Başlangıç Tarihi</label>
            <input required name="startDate" type="date" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent rounded-sm" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-foreground mb-1">Bitiş Tarihi</label>
            <input required name="endDate" type="date" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-transparent rounded-sm" />
          </div>
          <div className="w-full">
            <label className="block text-sm font-bold text-foreground mb-1">Spor Türü</label>
            <select required name="sportType" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background rounded-sm">
              <option value="">Seçiniz...</option>
              <option value="basketball">Basketbol</option>
              <option value="football">Futbol</option>
              <option value="swimming">Yüzme</option>
              <option value="tennis">Tenis</option>
              <option value="volleyball">Voleybol</option>
              <option value="general">Genel Spor</option>
            </select>
          </div>
          <Button type="submit" disabled={rep1Loading} className="w-full md:w-auto h-11 px-8 border-2 border-foreground hover:bg-transparent hover:text-foreground">
            Sorgula
          </Button>
        </form>

        {rep1Data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
                  <th className="p-3 font-bold">Kursiyer Adı</th>
                  <th className="p-3 font-bold">TC Kimlik</th>
                  <th className="p-3 font-bold">Kurs Adı</th>
                  <th className="p-3 font-bold">Kayıt Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {rep1Data.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">Kayıt bulunamadı.</td></tr>
                ) : (
                  rep1Data.map(app => (
                    <tr key={app.id} className="border-b border-slate-200 dark:border-slate-800">
                      <td className="p-3">{app.applicant.firstName} {app.applicant.lastName}</td>
                      <td className="p-3">{app.applicant.tcIdentity}</td>
                      <td className="p-3">{app.course.title}</td>
                      <td className="p-3">{new Date(app.appliedAt).toLocaleDateString("tr-TR")}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 2. Sorgu */}
      <Card className="p-6 bg-white dark:bg-[#1a120d] border-2 border-slate-300 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 border-b border-slate-300 dark:border-slate-700 pb-2">2. Spor Türüne Göre Eğitmen Sorgusu</h2>
        <form onSubmit={handleRep2Submit} className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-bold text-foreground mb-1">Spor Türü</label>
            <select required name="sportType" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background rounded-sm">
              <option value="">Seçiniz...</option>
              <option value="basketball">Basketbol</option>
              <option value="football">Futbol</option>
              <option value="swimming">Yüzme</option>
              <option value="tennis">Tenis</option>
              <option value="volleyball">Voleybol</option>
              <option value="general">Genel Spor</option>
            </select>
          </div>
          <Button type="submit" disabled={rep2Loading} className="w-full md:w-auto h-11 px-8 border-2 border-foreground hover:bg-transparent hover:text-foreground">
            Sorgula
          </Button>
        </form>

        {rep2Data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
                  <th className="p-3 font-bold">Eğitmen Adı</th>
                  <th className="p-3 font-bold">Branş</th>
                  <th className="p-3 font-bold">İletişim</th>
                  <th className="p-3 font-bold">Verdiği Kurs Sayısı</th>
                </tr>
              </thead>
              <tbody>
                {rep2Data.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">Bu kritere uygun eğitmen bulunamadı.</td></tr>
                ) : (
                  rep2Data.map(t => (
                    <tr key={t.id} className="border-b border-slate-200 dark:border-slate-800">
                      <td className="p-3">{t.firstName} {t.lastName}</td>
                      <td className="p-3">{t.branch}</td>
                      <td className="p-3">{t.email || "-"}</td>
                      <td className="p-3">{t.courses.length}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 3. Sorgu */}
      <Card className="p-6 bg-white dark:bg-[#1a120d] border-2 border-slate-300 dark:border-slate-700">
        <h2 className="text-xl font-bold mb-4 border-b border-slate-300 dark:border-slate-700 pb-2">3. Salon/Tesis Bazlı Kurs Doluluk Sorgusu</h2>
        <form onSubmit={handleRep3Submit} className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-bold text-foreground mb-1">Tesis Seçimi</label>
            <select required name="facilityId" className="w-full p-2 border-2 border-slate-300 dark:border-slate-700 bg-background rounded-sm">
              <option value="">Seçiniz...</option>
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name} (Kapasite: {f.capacity})</option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={rep3Loading} className="w-full md:w-auto h-11 px-8 border-2 border-foreground hover:bg-transparent hover:text-foreground">
            Sorgula
          </Button>
        </form>

        {rep3Data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
                  <th className="p-3 font-bold">Kurs Adı</th>
                  <th className="p-3 font-bold">Eğitmen</th>
                  <th className="p-3 font-bold">Tarihler</th>
                  <th className="p-3 font-bold">Doluluk</th>
                </tr>
              </thead>
              <tbody>
                {rep3Data.length === 0 ? (
                  <tr><td colSpan={4} className="p-4 text-center">Bu salonda planlanmış kurs bulunamadı.</td></tr>
                ) : (
                  rep3Data.map(c => {
                    const filled = c._count.applications
                    const isFull = filled >= c.quota
                    return (
                      <tr key={c.id} className="border-b border-slate-200 dark:border-slate-800">
                        <td className="p-3 font-semibold">{c.title}</td>
                        <td className="p-3">{c.trainer.firstName} {c.trainer.lastName}</td>
                        <td className="p-3">
                          {new Date(c.startDate).toLocaleDateString("tr-TR")} - {new Date(c.endDate).toLocaleDateString("tr-TR")}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-bold rounded-sm border ${isFull ? 'bg-red-100 text-red-800 border-red-500' : 'bg-emerald-100 text-emerald-800 border-emerald-500'}`}>
                            {filled} / {c.quota} {isFull && "(Dolu)"}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
