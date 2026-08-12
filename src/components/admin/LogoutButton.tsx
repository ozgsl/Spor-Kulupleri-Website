"use client"

import { adminLogout } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  return (
    <button 
      onClick={() => adminLogout()}
      className="inline-flex items-center justify-center font-bold rounded-sm transition-colors duration-200 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 hover:bg-red-200 dark:hover:bg-red-900/50 px-4 py-2 text-sm"
    >
      <LogOut className="w-4 h-4 mr-2" />
      Çıkış Yap
    </button>
  )
}
