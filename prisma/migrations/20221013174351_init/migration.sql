-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `addr` VARCHAR(191) NOT NULL,
    `referrer_code` VARCHAR(191) NOT NULL,
    `referral_code` VARCHAR(191) NOT NULL,
    `referred` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_addr_key`(`addr`),
    UNIQUE INDEX `User_referral_code_key`(`referral_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
