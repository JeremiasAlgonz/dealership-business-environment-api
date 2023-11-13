-- CreateTable
CREATE TABLE `Clientes` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoProprietario` ENUM('PESSOA_FISICA', 'PESSOA_JURIDICA') NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(14) NULL,
    `cnpj` VARCHAR(18) NULL,
    `telefone` VARCHAR(16) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    UNIQUE INDEX `Clientes_cpf_key`(`cpf`),
    UNIQUE INDEX `Clientes_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Clientes_id_endereco_key`(`id_endereco`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Concessionarias` (
    `id_concessionaria` INTEGER NOT NULL AUTO_INCREMENT,
    `cnpj` VARCHAR(18) NOT NULL,
    `nomeFantasia` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(16) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    UNIQUE INDEX `Concessionarias_cnpj_key`(`cnpj`),
    UNIQUE INDEX `Concessionarias_id_endereco_key`(`id_endereco`),
    PRIMARY KEY (`id_concessionaria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motocicletas` (
    `id_motocicleta` INTEGER NOT NULL AUTO_INCREMENT,
    `renavam` INTEGER NOT NULL,
    `kilometragem` DECIMAL(6, 2) NOT NULL,
    `placa` VARCHAR(8) NULL,
    `marca` VARCHAR(20) NOT NULL,
    `modelo` VARCHAR(20) NOT NULL,
    `anoFabricacao` INTEGER NOT NULL,
    `anoModelo` INTEGER NOT NULL,
    `potencia` DECIMAL(6, 2) NOT NULL,
    `cor` VARCHAR(15) NOT NULL,
    `estado` ENUM('NOVO', 'USADO') NOT NULL DEFAULT 'NOVO',
    `id_concessionaria` INTEGER NOT NULL,
    `clienteId_cliente` INTEGER NULL,

    UNIQUE INDEX `Motocicletas_placa_key`(`placa`),
    PRIMARY KEY (`id_motocicleta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(100) NOT NULL,
    `numero` INTEGER NOT NULL,
    `complemento` VARCHAR(50) NOT NULL,
    `codigoPostal` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente_Concessionaria` (
    `id_clienteConcessionaria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_concessionaria` INTEGER NOT NULL,

    PRIMARY KEY (`id_clienteConcessionaria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClienteToConcessionaria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClienteToConcessionaria_AB_unique`(`A`, `B`),
    INDEX `_ClienteToConcessionaria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clientes` ADD CONSTRAINT `Clientes_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Concessionarias` ADD CONSTRAINT `Concessionarias_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Motocicletas` ADD CONSTRAINT `Motocicletas_id_concessionaria_fkey` FOREIGN KEY (`id_concessionaria`) REFERENCES `Concessionarias`(`id_concessionaria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Motocicletas` ADD CONSTRAINT `Motocicletas_clienteId_cliente_fkey` FOREIGN KEY (`clienteId_cliente`) REFERENCES `Clientes`(`id_cliente`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente_Concessionaria` ADD CONSTRAINT `Cliente_Concessionaria_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cliente_Concessionaria` ADD CONSTRAINT `Cliente_Concessionaria_id_concessionaria_fkey` FOREIGN KEY (`id_concessionaria`) REFERENCES `Concessionarias`(`id_concessionaria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToConcessionaria` ADD CONSTRAINT `_ClienteToConcessionaria_A_fkey` FOREIGN KEY (`A`) REFERENCES `Clientes`(`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClienteToConcessionaria` ADD CONSTRAINT `_ClienteToConcessionaria_B_fkey` FOREIGN KEY (`B`) REFERENCES `Concessionarias`(`id_concessionaria`) ON DELETE CASCADE ON UPDATE CASCADE;
