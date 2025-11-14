/*
  Warnings:

  - You are about to drop the `workout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "workout";

-- CreateTable
CREATE TABLE "exerciseCategory" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "exerciseId" INTEGER,

    CONSTRAINT "exerciseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "exerciseCategoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_exerciseCategoryId_fkey" FOREIGN KEY ("exerciseCategoryId") REFERENCES "exerciseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
