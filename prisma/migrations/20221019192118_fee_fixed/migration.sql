/*
  Warnings:

  - Added the required column `fee_fixed` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `fee_fixed` INTEGER NOT NULL;
