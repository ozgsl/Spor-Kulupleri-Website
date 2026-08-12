"use server"

import { prisma } from "@/lib/prisma"

// 1. Tarih ve Spor Türü bazında katılan (onaylı) kursiyerler sorgusu
export async function getApplicantsByDateAndSport(startDate: Date, endDate: Date, sportType: string) {
  try {
    const applications = await prisma.application.findMany({
      where: {
        status: "APPROVED",
        course: {
          sportType: sportType,
          startDate: { gte: startDate },
          endDate: { lte: endDate }
        }
      },
      include: {
        applicant: true,
        course: true
      },
      orderBy: { appliedAt: "desc" }
    })

    return { success: true, data: applications }
  } catch (error) {
    console.error("Kursiyer raporu hatası:", error)
    return { success: false, error: "Rapor alınamadı." }
  }
}

// 2. Spor Türüne göre Eğitmen (Hoca) sorgusu
export async function getTrainersBySport(sportType: string) {
  try {
    // Eğitmenleri, dahil oldukları kursların branşına (sportType) göre filtreleyip getiriyoruz.
    const trainers = await prisma.trainer.findMany({
      where: {
        courses: {
          some: {
            sportType: sportType
          }
        }
      },
      include: {
        courses: {
          where: { sportType: sportType }
        }
      }
    })

    return { success: true, data: trainers }
  } catch (error) {
    console.error("Eğitmen raporu hatası:", error)
    return { success: false, error: "Eğitmenler listelenemedi." }
  }
}

// 3. Salon/Saha bazlı verilen kurs listesi ve doluluk/durum sorgusu
export async function getCoursesByFacility(facilityId: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        facilityId: facilityId
      },
      include: {
        trainer: true,
        _count: {
          select: {
            applications: {
              where: { status: "APPROVED" }
            }
          }
        }
      },
      orderBy: { startDate: "asc" }
    })

    return { success: true, data: courses }
  } catch (error) {
    console.error("Salon raporu hatası:", error)
    return { success: false, error: "Kurs durumları listelenemedi." }
  }
}
