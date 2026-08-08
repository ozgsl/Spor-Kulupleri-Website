"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const ApplySchema = z.object({
  courseId: z.string().min(1, "Lütfen bir kurs seçin."),
  firstName: z.string().min(2, "Adınız en az 2 karakter olmalıdır."),
  lastName: z.string().min(2, "Soyadınız en az 2 karakter olmalıdır."),
  tcIdentity: z.string().length(11, "T.C. Kimlik No 11 haneli olmalıdır.").regex(/^[0-9]+$/, "Sadece rakam giriniz."),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Geçerli bir tarih giriniz."),
})

export type ActionState = {
  success?: boolean
  message?: string
  errors?: Record<string, string[]>
}

export async function submitApplication(prevState: ActionState, formData: FormData): Promise<ActionState> {
  // 1. Zod Validation
  const validatedFields = ApplySchema.safeParse({
    courseId: formData.get("courseId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    tcIdentity: formData.get("tcIdentity"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    birthDate: formData.get("birthDate"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Lütfen formdaki hataları düzeltin.",
    }
  }

  const data = validatedFields.data

  try {
    // 2. Check Course Quota
    const course = await prisma.course.findUnique({
      where: { id: data.courseId },
      include: {
        _count: {
          select: { applications: { where: { status: { not: "REJECTED" } } } }
        }
      }
    })

    if (!course) {
      return { success: false, message: "Seçilen kurs bulunamadı." }
    }

    if (course.status !== "ACTIVE") {
      return { success: false, message: "Bu kurs şu an başvurulara kapalıdır." }
    }

    if (course._count.applications >= course.quota) {
      return { success: false, message: "Üzgünüz, bu kursun kontenjanı dolmuştur." }
    }

    // 3. Find or Create Applicant
    let applicant = await prisma.applicant.findUnique({
      where: { tcIdentity: data.tcIdentity }
    })

    if (!applicant) {
      applicant = await prisma.applicant.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          tcIdentity: data.tcIdentity,
          phone: data.phone,
          email: data.email,
          birthDate: new Date(data.birthDate),
        }
      })
    }

    // 4. Check for Duplicate Application
    const existingApp = await prisma.application.findFirst({
      where: {
        courseId: course.id,
        applicantId: applicant.id,
      }
    })

    if (existingApp) {
      return { success: false, message: "Bu kurs için zaten aktif bir başvurunuz bulunmaktadır." }
    }

    // 5. Create Application
    await prisma.application.create({
      data: {
        courseId: course.id,
        applicantId: applicant.id,
        status: "PENDING"
      }
    })

    // 6. Revalidate Path to update counts
    revalidatePath("/apply")

    return {
      success: true,
      message: "Başvurunuz başarıyla alındı! Yönetici onayı bekliyor."
    }

  } catch (error) {
    console.error("Application Submit Error:", error)
    return { success: false, message: "Beklenmeyen bir sunucu hatası oluştu. Lütfen tekrar deneyin." }
  }
}
