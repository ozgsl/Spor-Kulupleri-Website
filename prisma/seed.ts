import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed verileri oluşturuluyor...')

  // 1. Tesisler (Facilities)
  const facility1 = await prisma.facility.create({
    data: {
      name: 'Merkez Kapalı Spor Salonu',
      type: 'Salon',
      capacity: 500,
      location: 'Şehir Merkezi Kampüsü',
    },
  })

  const facility2 = await prisma.facility.create({
    data: {
      name: 'Açık Çim Saha - 1',
      type: 'Saha',
      capacity: 200,
      location: 'Kuzey Kampüs',
    },
  })

  // 2. Eğitmenler (Trainers)
  const trainer1 = await prisma.trainer.create({
    data: {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      branch: 'Voleybol',
      phone: '05551112233',
      email: 'ahmet.y@example.com',
    },
  })

  const trainer2 = await prisma.trainer.create({
    data: {
      firstName: 'Ayşe',
      lastName: 'Demir',
      branch: 'Futbol',
      phone: '05554445566',
      email: 'ayse.d@example.com',
    },
  })

  // 3. Kurslar (Courses)
  const course1 = await prisma.course.create({
    data: {
      title: 'Yaz Dönemi Voleybol Kampı',
      sportType: 'Voleybol',
      facilityId: facility1.id,
      trainerId: trainer1.id,
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-08-31'),
      quota: 20,
    },
  })

  const course2 = await prisma.course.create({
    data: {
      title: 'U-15 Futbol Hazırlık',
      sportType: 'Futbol',
      facilityId: facility2.id,
      trainerId: trainer2.id,
      startDate: new Date('2026-07-15'),
      endDate: new Date('2026-09-15'),
      quota: 30,
    },
  })

  // 4. Kursiyerler ve Başvurular (Applicants & Applications)
  const applicant1 = await prisma.applicant.create({
    data: {
      firstName: 'Can',
      lastName: 'Öztürk',
      tcIdentity: '12345678901',
      phone: '05559998877',
      email: 'can.ozturk@example.com',
      birthDate: new Date('2010-05-15'),
      applications: {
        create: [
          {
            courseId: course1.id,
            status: 'PENDING',
          },
        ],
      },
    },
  })

  console.log('Seed verileri başarıyla yüklendi!')
  console.log('Oluşturulan Tesisler:', [facility1.name, facility2.name])
  console.log('Oluşturulan Eğitmenler:', [trainer1.firstName, trainer2.firstName])
  console.log('Oluşturulan Kurslar:', [course1.title, course2.title])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
