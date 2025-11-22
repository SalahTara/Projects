import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

export default prisma;
