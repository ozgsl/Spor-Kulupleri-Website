"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function adminLogin(formData: FormData) {
  const email = formData.get("email")
  const password = formData.get("password")

  // Sabit bilgileri kontrol et (Güvenlik gereği projede bunu kullanıyoruz)
  if (email === "admin@kurs.com" && password === "admin123") {
    // 1 günlük (24 saat) güvenli HTTP çerezi oluşturuyoruz
    const cookieStore = await cookies()
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Prod'da sadece HTTPS
      maxAge: 60 * 60 * 24, // 24 saat
      path: "/",
    })
    
    return { success: true }
  }

  return { success: false, error: "E-posta veya şifre hatalı!" }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}
