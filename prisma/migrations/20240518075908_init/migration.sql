/*
  Warnings:

  - You are about to drop the column `balance` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `balance`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `amount`,
    DROP COLUMN `status`,
    DROP COLUMN `transaction_type`,
    ADD COLUMN `deposit` DECIMAL(15, 5) NULL DEFAULT 0.00000,
    ADD COLUMN `deposit_status` ENUM('reject', 'confirm', 'submit') NULL DEFAULT 'submit',
    ADD COLUMN `withdrawal` DECIMAL(15, 5) NULL DEFAULT 0.00000,
    ADD COLUMN `withdrawal_status` ENUM('reject', 'submit', 'approve') NULL DEFAULT 'submit';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `userBalance` DECIMAL(15, 2) NULL DEFAULT 0.00;
