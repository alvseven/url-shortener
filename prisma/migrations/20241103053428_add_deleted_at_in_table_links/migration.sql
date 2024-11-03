/*
  Warnings:

  - You are about to drop the column `clicks` on the `links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "links" DROP COLUMN "clicks",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
