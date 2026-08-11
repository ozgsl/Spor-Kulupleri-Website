"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED"

export async function getApplications() {
  try {
    const applications = await prisma.application.findMany({
      orderBy: {
        appliedAt: 'desc'
      },
      include: {
        applicant: true,
        course: {
          include: {
            facility: true,
            trainer: true,
            _count: {
              select: {
                applications: {
                  where: {
                    status: "APPROVED" // Onaylanan sayısını da direkt çekeriz ki doluluğu görelim
                  }
                }
              }
            }
          }
        }
      }
    })

    return { success: true, data: applications }
  } catch (error) {
    console.error("Başvurular getirilirken hata oluştu:", error)
    return { success: false, error: "Veritabanı hatası oluştu." }
  }
}

export async function updateApplicationStatus(applicationId: string, newStatus: ApplicationStatus) {
  try {
    // Transaction ile güvenli bir şekilde statüyü güncelliyoruz
    const result = await prisma.$transaction(async (tx) => {
      const application = await tx.application.findUnique({
        where: { id: applicationId },
        include: { course: true }
      })

      if (!application) {
        throw new Error("Başvuru bulunamadı.")
      }

      // Eğer onaylanıyorsa, kontenjan kontrolü yap
      if (newStatus === "APPROVED") {
        const approvedCount = await tx.application.count({
          where: {
            courseId: application.courseId,
            status: "APPROVED"
          }
        })

        if (approvedCount >= application.course.quota) {
          throw new Error("Bu kursun kontenjanı dolmuştur.")
        }
      }

      const updated = await tx.application.update({
        where: { id: applicationId },
        data: { status: newStatus }
      })

      return updated
    })

    revalidatePath("/admin")
    return { success: true, data: result }
  } catch (error: any) {
    console.error("Başvuru durumu güncellenirken hata:", error)
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu." }
  }
}
