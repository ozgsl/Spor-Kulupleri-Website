"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Next.js 15 (React 19) development uyarısını gizlemek için yama (Workaround)
// next-themes'in FOUC engellemek için attığı <script> etiketi React 19'da uyarı veriyor.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const orig = console.error
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return
    }
    orig.apply(console, args)
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
