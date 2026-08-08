import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spor Kursları",
  description: "Eğitmenler, salonlar ve kursiyer başvuruları için tek noktadan dijital yönetim.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-outfit)] bg-mesh">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
