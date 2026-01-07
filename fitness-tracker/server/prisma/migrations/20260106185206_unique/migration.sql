/*
  Warnings:

  - A unique constraint covering the columns `[providerUserId]` on the table `AuthProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AuthProvider_providerUserId_key" ON "AuthProvider"("providerUserId");
