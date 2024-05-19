/*
  Warnings:

  - You are about to drop the column `accountId` on the `NightlyBalanceLog` table. All the data in the column will be lost.
  - Added the required column `userId` to the `NightlyBalanceLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `NightlyBalanceLog` DROP FOREIGN KEY `NightlyBalanceLog_accountId_fkey`;

-- AlterTable
ALTER TABLE `NightlyBalanceLog` DROP COLUMN `accountId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `NightlyBalanceLog_userId_fkey` ON `NightlyBalanceLog`(`userId`);

-- AddForeignKey
ALTER TABLE `NightlyBalanceLog` ADD CONSTRAINT `NightlyBalanceLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
