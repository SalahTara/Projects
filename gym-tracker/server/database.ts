import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
  // Create (insert) a user
  // const newUser = await prisma.user.create({
  //   data: {
  //     name: "Alice Johnson",
  //     email: "alice@example.com",
  //     password: "supersecurepassword123",
  //   },
  // });
  // console.log("Created user:", newUser);
  // const createWorkout = await prisma.exerciseCategory.create({
  //   data: {
  //     category: "Legs",
  //   },
  // });
  // console.log(createWorkout);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

export default prisma;
