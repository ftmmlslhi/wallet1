/*
  Warnings:

  - Added the required column `currentFee` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalAmount` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `currentFee` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `finalAmount` DECIMAL(15, 5) NOT NULL;
