/*
  Warnings:

  - You are about to alter the column `fee` on the `sett` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,3)`.
  - You are about to alter the column `currentFee` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,3)`.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `NightlyBalanceLog` DROP FOREIGN KEY `NightlyBalanceLog_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `sett` DROP FOREIGN KEY `sett_ibfk_1`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_account` DROP FOREIGN KEY `user_account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_account` DROP FOREIGN KEY `user_account_ibfk_2`;

-- AlterTable
ALTER TABLE `sett` MODIFY `fee` DECIMAL(10, 3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `currentFee` DECIMAL(10, 3) NOT NULL;

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `user_account`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_number` VARCHAR(20) NOT NULL,
    `cvv` INTEGER NOT NULL,
    `iban` INTEGER NOT NULL,
    `opened_date` DATE NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `lastName` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `mobile_number` VARCHAR(255) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `userBalance` DECIMAL(15, 2) NULL DEFAULT 0.00,

    UNIQUE INDEX `username`(`username`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sett` ADD CONSTRAINT `sett_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `NightlyBalanceLog` ADD CONSTRAINT `NightlyBalanceLog_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
