import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { SportIllustration } from "@/components/ui/SportIllustration"
import { Lock, UserPlus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Floating Sport Illustrations (Gamification Elements) */}
      <div className="absolute top-[15%] left-[10%] opacity-80 hidden lg:block">
        <SportIllustration sportType="basketball" />
      </div>
      <div className="absolute bottom-[20%] left-[15%] opacity-80 hidden lg:block">
        <SportIllustration sportType="tennis" />
      </div>
      <div className="absolute top-[25%] right-[10%] opacity-80 hidden lg:block">
        <SportIllustration sportType="swimming" />
      </div>
      <div className="absolute bottom-[15%] right-[15%] opacity-80 hidden lg:block">
        <SportIllustration sportType="volleyball" />
      </div>

      {/* Header Section */}
      <div className="text-center z-10 mb-16 max-w-3xl relative">
        <div className="inline-block mb-6 px-5 py-2 rounded-full border border-emerald-300 bg-emerald-100 text-sm font-bold text-emerald-800 shadow-sm animate-glow-pulse">
          ✨ Yeni Dönem Kayıtları Başladı
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
          Spor Kursları <br />
          <span className="bg-gradient-to-r from-emerald-600 to-amber-500 bg-clip-text text-transparent">Kayıt Sistemi</span>
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Eğitmenler, salonlar ve kursiyer başvuruları için tek noktadan dijital yönetim.
        </p>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
        
        {/* Kursiyer Kayıt Kartı */}
        <Card hoverEffect className="group flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-white dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:animate-glow-pulse transition-transform duration-500 shadow-sm">
            <UserPlus className="w-10 h-10 text-primary-hover" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Kursiyer Başvurusu</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 flex-grow font-medium">
            Uygun kursları görüntüleyin, eğitmenleri inceleyin ve kayıt başvurunuzu tamamlayın.
          </p>
          <Link href="/apply" className="w-full">
            <Button variant="primary" size="lg" fullWidth className="group/btn">
              Başvuru Yap 
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </Card>

        {/* Admin Paneli Kartı */}
        <Card hoverEffect className="group flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-700 border-4 border-white dark:border-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
            <Lock className="w-10 h-10 text-slate-400 dark:text-slate-300 group-hover:text-slate-600 dark:group-hover:text-white transition-colors" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white">Yönetici Paneli</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 flex-grow font-medium">
            Kayıt başvurularını onaylayın, kursları planlayın ve eğitmen - tesis atamalarını yapın.
          </p>
          <Link href="/admin" className="w-full">
            <Button variant="outline" size="lg" fullWidth className="group/btn">
              Giriş Yap
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </Card>

      </div>
    </main>
  );
}
