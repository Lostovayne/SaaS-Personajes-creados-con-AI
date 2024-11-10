-- AlterTable
ALTER TABLE `companion` MODIFY `description` VARCHAR(250) NOT NULL;

-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('user', 'system') NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `companionId` VARCHAR(191) NOT NULL,

    INDEX `Message_companionId_idx`(`companionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_companionId_fkey` FOREIGN KEY (`companionId`) REFERENCES `Companion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
