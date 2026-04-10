import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Очищаем существующие данные (опционально)
  await prisma.userRole.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

  console.log('✅ Cleaned existing data');

  // Создаем разрешения
  console.log('📝 Creating permissions...');
  const permissions = await prisma.permission.createMany({
    data: [
      { action: 'CREATE', resource: 'CLINICAL_GUIDELINE', conditions: {}, description: 'Create new clinical guidelines' },
      { action: 'EDIT', resource: 'CLINICAL_GUIDELINE', conditions: { ownerOnly: true, allowedStatuses: ['DRAFT'] }, description: 'Edit clinical guidelines (only drafts)' },
      { action: 'DELETE', resource: 'CLINICAL_GUIDELINE', conditions: { ownerOnly: true, allowedStatuses: ['DRAFT'] }, description: 'Delete clinical guidelines' },
      { action: 'VIEW', resource: 'CLINICAL_GUIDELINE', conditions: {}, description: 'View clinical guidelines' },
      { action: 'COMPARE', resource: 'COMPARISON', conditions: {}, description: 'Compare clinical guidelines' },
      { action: 'SPECIAL_ACTION', resource: 'SPECIAL_FEATURE', conditions: {}, description: 'Special action access' },
      { action: 'MANAGE_USERS', resource: 'USER', conditions: {}, description: 'Manage users' },
      { action: 'MANAGE_ROLES', resource: 'ROLE', conditions: {}, description: 'Manage roles' },
    ],
  });

  console.log(`✅ Created ${Object.keys(permissions).length} permissions`);

  // Получаем все разрешения
  const allPermissions = await prisma.permission.findMany();

  // Создаем роли
  console.log('👥 Creating roles...');
  const adminRole = await prisma.role.create({
    data: {
      name: 'ADMIN',
      description: 'System Administrator',
      isSystem: true,
    },
  });

  const doctorRole = await prisma.role.create({
    data: {
      name: 'DOCTOR',
      description: 'Doctor with editing rights',
      isSystem: true,
    },
  });

  const viewerRole = await prisma.role.create({
    data: {
      name: 'VIEWER',
      description: 'Read-only access',
      isSystem: true,
    },
  });

  console.log('✅ Created roles: ADMIN, DOCTOR, VIEWER');

  // Назначаем разрешения ролям
  console.log('🔐 Assigning permissions to roles...');
  
  for (const permission of allPermissions) {
    // ADMIN получает все разрешения
    await prisma.rolePermission.create({
      data: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });

    // DOCTOR получает CREATE, EDIT, VIEW, COMPARE
    if (['CREATE', 'EDIT', 'VIEW', 'COMPARE'].includes(permission.action)) {
      await prisma.rolePermission.create({
        data: {
          roleId: doctorRole.id,
          permissionId: permission.id,
        },
      });
    }

    // VIEWER получает только VIEW
    if (permission.action === 'VIEW') {
      await prisma.rolePermission.create({
        data: {
          roleId: viewerRole.id,
          permissionId: permission.id,
        },
      });
    }
  }

  console.log('✅ Permissions assigned');

  // Создаем пользователей
  console.log('👤 Creating users...');
  
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      specialty: 'ADMIN',
      isActive: true,
    },
  });

  const doctorPassword = await bcrypt.hash('doctor123', 10);
  const doctor = await prisma.user.create({
    data: {
      email: 'doctor@example.com',
      passwordHash: doctorPassword,
      firstName: 'John',
      lastName: 'Doe',
      specialty: 'CARDIOLOGY',
      department: 'Cardiology Dept',
      isActive: true,
    },
  });

  const viewerPassword = await bcrypt.hash('viewer123', 10);
  const viewer = await prisma.user.create({
    data: {
      email: 'viewer@example.com',
      passwordHash: viewerPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      specialty: 'ONCOLOGY',
      department: 'Oncology Dept',
      isActive: true,
    },
  });

  console.log('✅ Users created:');
  console.log(`   Admin: admin@example.com / admin123`);
  console.log(`   Doctor: doctor@example.com / doctor123`);
  console.log(`   Viewer: viewer@example.com / viewer123`);

  // Назначаем роли пользователям
  console.log('🎭 Assigning roles to users...');
  
  await prisma.userRole.create({
    data: {
      userId: admin.id,
      roleId: adminRole.id,
      grantedBy: admin.id,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: doctor.id,
      roleId: doctorRole.id,
      scope: { specialties: ['CARDIOLOGY'], departments: ['Cardiology Dept'] },
      grantedBy: admin.id,
    },
  });

  await prisma.userRole.create({
    data: {
      userId: viewer.id,
      roleId: viewerRole.id,
      scope: { specialties: ['ONCOLOGY'] },
      grantedBy: admin.id,
    },
  });

  console.log('✅ Roles assigned');
  console.log('🌱 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });