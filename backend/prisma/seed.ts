import { PrismaClient, Role, UserLevelCode, MembershipStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seeder de Café y Código...');

  const defaultPassword = await bcrypt.hash('Cafe1234!', 10);

  // 1. Usuarios Base
  const admin = await prisma.user.upsert({
    where: { email: 'admin@cafeycodigo.org' },
    update: {},
    create: {
      email: 'admin@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'Super Administrador',
      role: Role.ADMIN,
      isEmailVerified: true,
      coffeeCoins: 1000,
      levelCode: UserLevelCode.ristretto,
      points: 5000,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@cafeycodigo.org' },
    update: {},
    create: {
      email: 'editor@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'Editor de Contenidos',
      role: Role.EDITOR,
      isEmailVerified: true,
      coffeeCoins: 350,
      levelCode: UserLevelCode.espresso,
      points: 1500,
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'docente@cafeycodigo.org' },
    update: {},
    create: {
      email: 'docente@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'Profesor Benjamín',
      role: Role.TEACHER,
      isEmailVerified: true,
      coffeeCoins: 500,
      levelCode: UserLevelCode.espresso,
      points: 2500,
    },
  });

  const student1 = await prisma.user.upsert({
    where: { email: 'estudiante@cafeycodigo.org' },
    update: {},
    create: {
      email: 'estudiante@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'Estudiante Demo',
      role: Role.STUDENT,
      isEmailVerified: true,
      coffeeCoins: 80,
      levelCode: UserLevelCode.americano,
      points: 200,
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'maria@cafeycodigo.org' },
    update: {},
    create: {
      email: 'maria@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'María Alarcón',
      role: Role.STUDENT,
      isEmailVerified: true,
      coffeeCoins: 120,
      levelCode: UserLevelCode.latte,
      points: 450,
    },
  });

  const student3 = await prisma.user.upsert({
    where: { email: 'carlos@cafeycodigo.org' },
    update: {},
    create: {
      email: 'carlos@cafeycodigo.org',
      passwordHash: defaultPassword,
      name: 'Carlos Mendoza',
      role: Role.STUDENT,
      isEmailVerified: true,
      coffeeCoins: 40,
      levelCode: UserLevelCode.americano,
      points: 90,
    },
  });

  console.log('✅ Usuarios creados/verificados: Admin, Editor, Docente, 3 Estudiantes');

  // 2. Curso de ejemplo
  const course = await prisma.course.upsert({
    where: { courseId: 'primeros-pasos-algoritmos' },
    update: {},
    create: {
      courseId: 'primeros-pasos-algoritmos',
      title: 'Primeros Pasos en Algoritmos y Lógica de Programación',
      category: 'Programación Básica',
      institution: 'Café y Código',
      version: '1.0.0',
      status: 'PUBLISHED',
      authorId: teacher.id,
      document: {
        id: 'primeros-pasos-algoritmos',
        title: 'Primeros Pasos en Algoritmos y Lógica de Programación',
        institution: 'Café y Código',
        modules: [
          {
            id: 'mod-1',
            title: 'Módulo 1: Fundamentos de la Lógica',
            lessions: [
              {
                id: 'les-1',
                title: '¿Qué es un Algoritmo?',
                durationMinutes: 15,
                secciones: [
                  {
                    id: 'sec-1',
                    title: 'Conceptos Esenciales',
                    contenidos: [
                      {
                        id: 'cont-1',
                        type: 'theory',
                        title: 'Entrada, Proceso y Salida',
                        body: 'Un algoritmo es una secuencia de pasos lógicos y finitos para resolver un problema.'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
  });

  console.log(`✅ Curso '${course.title}' listo.`);

  // 3. Matrícula individual del Estudiante 1
  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student1.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      userId: student1.id,
      courseId: course.id,
      registeredById: teacher.id,
      completedContentIds: ['cont-1'],
      score: 100,
    },
  });

  // 4. Sección Académica con Código de Unión
  const section = await prisma.section.upsert({
    where: { code: 'ALGO-2026' },
    update: {},
    create: {
      name: 'Algoritmos y Estructuras - Sección 1 (2026)',
      code: 'ALGO-2026',
      description: 'Sección práctica de fundamentos algorítmicos. Código de acceso para estudiantes: ALGO-2026.',
      teacherId: teacher.id,
    },
  });

  // Vincular Curso a la Sección
  await prisma.sectionCourse.upsert({
    where: {
      sectionId_courseId: {
        sectionId: section.id,
        courseId: course.id,
      },
    },
    update: {},
    create: {
      sectionId: section.id,
      courseId: course.id,
    },
  });

  // Membresías en la Sección:
  // Estudiante 1: APPROVED
  await prisma.sectionMember.upsert({
    where: {
      sectionId_userId: {
        sectionId: section.id,
        userId: student1.id,
      },
    },
    update: { status: MembershipStatus.APPROVED },
    create: {
      sectionId: section.id,
      userId: student1.id,
      status: MembershipStatus.APPROVED,
    },
  });

  // Estudiante 2: APPROVED
  await prisma.sectionMember.upsert({
    where: {
      sectionId_userId: {
        sectionId: section.id,
        userId: student2.id,
      },
    },
    update: { status: MembershipStatus.APPROVED },
    create: {
      sectionId: section.id,
      userId: student2.id,
      status: MembershipStatus.APPROVED,
    },
  });

  // Estudiante 3: PENDING (para probar bandeja de aprobación del profesor)
  await prisma.sectionMember.upsert({
    where: {
      sectionId_userId: {
        sectionId: section.id,
        userId: student3.id,
      },
    },
    update: { status: MembershipStatus.PENDING },
    create: {
      sectionId: section.id,
      userId: student3.id,
      status: MembershipStatus.PENDING,
    },
  });

  // 5. Grupo de Trabajo con Representante (student1)
  const existingGroup = await prisma.workGroup.findFirst({
    where: { sectionId: section.id, name: 'Equipo Alfa - Algoritmos' },
  });

  let group = existingGroup;
  if (!group) {
    group = await prisma.workGroup.create({
      data: {
        sectionId: section.id,
        name: 'Equipo Alfa - Algoritmos',
        leaderId: student1.id, // Representante
        members: {
          create: [
            { userId: student1.id },
            { userId: student2.id },
          ],
        },
      },
    });
  }

  // 6. Foro de Discusión en la Sección
  const existingTopic = await prisma.forumTopic.findFirst({
    where: { sectionId: section.id, title: 'Bienvenida y Consultas Generales' },
  });

  if (!existingTopic) {
    const topic = await prisma.forumTopic.create({
      data: {
        sectionId: section.id,
        authorId: teacher.id,
        title: 'Bienvenida y Consultas Generales',
        content: '¡Bienvenidos a la sección ALGO-2026! Usen este hilo para presentarse y plantear cualquier duda sobre el curso.',
        isPinned: true,
        posts: {
          create: [
            {
              authorId: student1.id,
              content: '¡Hola a todos! Soy el representante del Equipo Alfa. Estamos listos para comenzar.',
            },
          ],
        },
      },
    });
    console.log(`✅ Foro iniciado con tema: '${topic.title}'`);
  }

  console.log('🎉 Seeding completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

