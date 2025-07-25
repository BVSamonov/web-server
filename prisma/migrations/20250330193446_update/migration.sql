/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserModel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "refreshToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");
