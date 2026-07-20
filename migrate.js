const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const guestUser = await prisma.users.findUnique({ where: { email: 'guest@axara.com' } });
  const devUser = await prisma.users.findUnique({ where: { email: 'dev@axara.local' } });
  
  if (guestUser && devUser) {
    const updated = await prisma.patients.updateMany({
      where: { user_id: guestUser.id },
      data: { user_id: devUser.id }
    });
    console.log(`Migrated ${updated.count} patients from guest to dev.`);
  } else {
    console.log('Either guest or dev user not found. Guest:', guestUser, 'DevUser:', devUser);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
