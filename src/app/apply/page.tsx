import { Card } from "@/components/ui/Card"
import { SportIllustration } from "@/components/ui/SportIllustration"
import { Button } from "@/components/ui/Button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ApplyForm } from "@/components/forms/ApplyForm"

export const dynamic = "force-dynamic"

export default async function ApplyPage() {
  // Fetch active courses and calculate availability
  const activeCourses = await prisma.course.findMany({
    where: { status: "ACTIVE" },
    include: {
      _count: {
        select: { applications: { where: { status: { not: "REJECTED" } } } }
      }
    }
  })

  const courseData = activeCourses.map(course => ({
    id: course.id,
    title: course.title,
    sportType: course.sportType,
    quota: course.quota,
    available: course.quota - course._count.applications
  }))

  return (
    <main className="min-h-screen flex flex-col p-6 lg:p-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-10 mb-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </nav>

      {/* Header */}
      <div className="relative z-10 mb-12 max-w-4xl">
        <div className="flex items-center gap-6 mb-6">
          <SportIllustration sportType="general" className="hidden sm:flex" />
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Kursiyer <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Başvuru Formu</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              Sana en uygun sporu seç, yeteneklerini keşfet ve kayıt adımını tamamla. Başarı hikayen burada başlıyor!
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Taraf: Form */}
        <div className="lg:col-span-2">
          <Card>
            <ApplyForm courses={courseData} />
          </Card>
        </div>

        {/* Sağ Taraf: Dinamik Özet ve Gamification */}
        <div className="space-y-6">
          <Card className="bg-primary-100 dark:bg-slate-800 border-primary/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-70">
              <SportIllustration sportType="basketball" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white relative z-10">Neden Biz?</h3>
            <ul className="space-y-5 text-slate-700 dark:text-slate-300 relative z-10 font-medium">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏆</span>
                <span>Uzman eğitmen kadrosu ve profesyonel gelişim takibi.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏟️</span>
                <span>Uluslararası standartlarda tam donanımlı spor tesisleri.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <span>Dijital rozetler ve oyunlaştırılmış eğitim sistemi.</span>
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </main>
  )
}
