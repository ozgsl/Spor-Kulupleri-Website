import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { SportIllustration } from "@/components/ui/SportIllustration"
import { Lock, UserPlus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col p-6 lg:p-12 relative overflow-hidden bg-background">
      
      {/* Header Section */}
      <div className="text-left z-10 mb-16 max-w-4xl relative mt-12 lg:mt-24">
        <div className="inline-block mb-6 px-4 py-2 border border-secondary bg-secondary-100 text-sm font-semibold text-secondary-hover shadow-[2px_2px_0_0_rgba(217,119,6,0.2)] dark:bg-[#1f1610] dark:border-[#38281d] dark:text-[#FDE68A]">
          Demo sürümü — Akademisyen isimleri gerçek değildir, örnek veriyle üretilmiştir.
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground leading-tight">
          Doğru kursu seç, <br />
          gerçek eğitim <br />
          deneyimlerini keşfet.
        </h1>
        <p className="text-lg lg:text-xl text-foreground/80 font-medium max-w-2xl">
          Kürsü, öğrencilerin dersler ve eğitmenler hakkındaki deneyimlerini paylaştığı kurumsal değerlendirme platformudur.
        </p>
      </div>

      {/* Main Grid Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10 relative max-w-4xl">
        
        {/* Applicant Card */}
        <Card hoverEffect className="group flex flex-col items-start text-left bg-white dark:bg-[#1f1610]">
          <h2 className="text-2xl font-bold mb-3 text-foreground">Kursiyer Başvurusu</h2>
          <p className="text-foreground/70 mb-8 flex-grow font-medium">
            Uygun kursları görüntüleyin, eğitmenleri inceleyin ve kayıt başvurunuzu tamamlayın.
          </p>
          <Link 
            href="/apply" 
            className="w-full inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-200 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background py-4"
          >
            Başvuru Yap
          </Link>
        </Card>

        {/* Admin Card */}
        <Card hoverEffect className="group flex flex-col items-start text-left bg-white dark:bg-[#1f1610]">
          <h2 className="text-2xl font-bold mb-3 text-foreground">Yönetici Paneli</h2>
          <p className="text-foreground/70 mb-8 flex-grow font-medium">
            Kayıt başvurularını onaylayın, kursları planlayın ve eğitmen - tesis atamalarını yapın.
          </p>
          <Link 
            href="/admin" 
            className="w-full inline-flex items-center justify-center font-semibold rounded-sm transition-colors duration-200 border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background py-4"
          >
            Giriş Yap
          </Link>
        </Card>

      </div>
    </main>
  )
}
