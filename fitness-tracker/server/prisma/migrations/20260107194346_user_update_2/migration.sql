/*
  Warnings:

  - You are about to drop the column `provider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `providerUserId` on the `User` table. All the data in the column will be lost.
  - Made the column `displayName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatarUrl` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "provider",
DROP COLUMN "providerUserId",
ADD COLUMN     "googleSub" TEXT,
ALTER COLUMN "displayName" SET NOT NULL,
ALTER COLUMN "avatarUrl" SET NOT NULL;

-- DropEnum
DROP TYPE "AuthType";
