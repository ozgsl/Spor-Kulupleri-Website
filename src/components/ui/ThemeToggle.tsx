"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./Button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="absolute top-4 right-4 w-10 h-10" />
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="p-2 border-2 border-foreground/50 bg-background text-foreground hover:bg-foreground hover:text-background absolute top-4 right-4 z-50 rounded-sm transition-colors"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Tema Değiştir</span>
    </Button>
  )
}
