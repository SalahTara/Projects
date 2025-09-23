import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

export default prisma;

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: "Sal",
//       email: "salahe@gmail.com",
//       age: 21,
//       userPreference: {
//         create: {
//           emailUpdates: true,
//         },
//       },
//     },
//     include: {
//       userPreference: true,
//     },
//   });
//   const user = await prisma.user.deleteMany();
//   console.log(user);
// }

// main()
//   .catch((e) => {
//     console.error(e.message);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
