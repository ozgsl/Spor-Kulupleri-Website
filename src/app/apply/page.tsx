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
    <main className="min-h-screen flex flex-col p-6 lg:p-12 relative overflow-hidden bg-background">
      
      {/* Navigation */}
      <nav className="relative z-10 mb-12">
        <Link href="/">
          <Button variant="ghost" size="sm" className="rounded-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </nav>

      {/* Header */}
      <div className="relative z-10 mb-12 max-w-4xl border-b border-slate-300 dark:border-slate-700/50 pb-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
          Kursiyer Başvuru Formu
        </h1>
        <p className="text-lg text-foreground/80 font-medium">
          Aşağıdaki formu eksiksiz doldurarak kayıt talebinizi sistemimize iletebilirsiniz.
        </p>
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
          <Card className="bg-[#f0e8db] dark:bg-[#1a120d] border-slate-300 dark:border-[#38281d]">
            <h3 className="text-xl font-bold mb-4 text-foreground border-b border-slate-300 dark:border-slate-700/50 pb-2">Kayıt Bilgilendirmesi</h3>
            <ul className="space-y-4 text-foreground/80 font-medium text-sm list-disc pl-4">
              <li>
                Lütfen T.C. Kimlik numaranızı 11 hane olacak şekilde doğru girdiğinizden emin olun.
              </li>
              <li>
                Sistemimiz mükerrer kayıtları engellemektedir. Bir kursa yalnızca bir kez başvuru yapılabilir.
              </li>
              <li>
                Başvuru sonrası yöneticilerimiz durumunuzu değerlendirecek ve e-posta ile tarafınıza dönüş yapılacaktır.
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </main>
  )
}
