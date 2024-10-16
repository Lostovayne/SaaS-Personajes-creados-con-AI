-- CreateTable
CREATE TABLE `Companion` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `name` TEXT NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `instructions` TEXT NOT NULL,
    `seed` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    INDEX `Companion_categoryId_idx`(`categoryId`),
    FULLTEXT INDEX `Companion_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Companion` ADD CONSTRAINT `Companion_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
