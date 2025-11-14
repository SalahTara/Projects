-- DropForeignKey
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_exerciseCategoryId_fkey";

-- CreateTable
CREATE TABLE "_exerciseToexerciseCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_exerciseToexerciseCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_exerciseToexerciseCategory_B_index" ON "_exerciseToexerciseCategory"("B");

-- AddForeignKey
ALTER TABLE "_exerciseToexerciseCategory" ADD CONSTRAINT "_exerciseToexerciseCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_exerciseToexerciseCategory" ADD CONSTRAINT "_exerciseToexerciseCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "exerciseCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
