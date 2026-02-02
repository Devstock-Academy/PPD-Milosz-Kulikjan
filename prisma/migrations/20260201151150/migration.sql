/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `imie` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nazwisko` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pseudonim` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - The required column `_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FUNCTION', 'LOOP');

-- CreateEnum
CREATE TYPE "CssCategory" AS ENUM ('SHAPES');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "imie",
DROP COLUMN "nazwisko",
DROP COLUMN "pseudonim",
DROP COLUMN "updatedAt",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "acceptTerms" BOOLEAN,
ADD COLUMN     "eneabled" BOOLEAN,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "nick" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("_id");

-- CreateTable
CREATE TABLE "JavascriptAssignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'FUNCTION',
    "difficultyLevel" "DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "submissions" INTEGER DEFAULT 0,
    "descriptionStart" TEXT NOT NULL,
    "descriptionEnd" TEXT,
    "sampleInput" TEXT[],
    "sampleOutput" TEXT[],
    "tests" JSONB[],
    "patternFunction" TEXT NOT NULL,

    CONSTRAINT "JavascriptAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CssAssignment" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "CssCategory" NOT NULL,
    "difficultyLevel" "DifficultyLevel" NOT NULL,
    "requirements" INTEGER NOT NULL,
    "colors" TEXT[],
    "targetUrl" TEXT NOT NULL,

    CONSTRAINT "CssAssignment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "JavascriptAssignmentSolution" (
    "id" TEXT NOT NULL,
    "javascriptAssignmentId" TEXT NOT NULL,
    "solution" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "JavascriptAssignmentSolution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CssAssignmentSolution" (
    "_id" TEXT NOT NULL,
    "CssAssignmentId" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CssAssignmentSolution_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JavascriptAssignmentSolution_javascriptAssignmentId_userId_key" ON "JavascriptAssignmentSolution"("javascriptAssignmentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "CssAssignmentSolution_CssAssignmentId_userId_key" ON "CssAssignmentSolution"("CssAssignmentId", "userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_javascriptAssignmentId_fkey" FOREIGN KEY ("javascriptAssignmentId") REFERENCES "JavascriptAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CssAssignmentSolution" ADD CONSTRAINT "CssAssignmentSolution_CssAssignmentId_fkey" FOREIGN KEY ("CssAssignmentId") REFERENCES "CssAssignment"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CssAssignmentSolution" ADD CONSTRAINT "CssAssignmentSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
