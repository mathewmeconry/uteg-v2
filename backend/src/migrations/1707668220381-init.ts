import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1707668220381 implements MigrationInterface {
    name = 'Init1707668220381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`competition\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`startDate\` timestamp NOT NULL, \`endDate\` timestamp NOT NULL, \`grounds\` int NOT NULL DEFAULT '1', \`modules\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`judgetoken\` (\`id\` int NOT NULL AUTO_INCREMENT, \`device\` int NOT NULL, \`ground\` int NOT NULL, \`competitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`globalRole\` int NOT NULL DEFAULT '10', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` int NOT NULL, \`userId\` int NULL, \`competitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`club\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_79098e276529e2f823ab6379e8\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starter\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stvID\` varchar(255) NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`birthyear\` int NOT NULL, \`sex\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_3e609edd13e9e6f9da575ec1e3\` (\`stvID\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`starter_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`starterId\` int NULL, \`competitionId\` int NULL, \`clubId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(5,3) NOT NULL, \`deviceNumber\` int NOT NULL, \`module\` varchar(255) NOT NULL, \`starterlinkId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egt_starter_link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category\` int NULL, \`divisionId\` int NULL, \`starterLinkId\` int NULL, \`lineupId\` int NULL, UNIQUE INDEX \`REL_dd71206368b9957999dfa37c97\` (\`starterLinkId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egt_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceNumber\` int NOT NULL, \`inputs\` int NOT NULL DEFAULT '1', \`aggregationMode\` varchar(255) NOT NULL DEFAULT 'none', \`overrides\` text NOT NULL DEFAULT '[]', \`competitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egt_lineup\` (\`id\` int NOT NULL AUTO_INCREMENT, \`currentRound\` int NOT NULL DEFAULT '0', \`divisionId\` int NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egt_division\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ground\` int NOT NULL, \`state\` varchar(255) NOT NULL DEFAULT 'PENDING', \`currentRound\` int NOT NULL DEFAULT '0', \`category\` int NOT NULL, \`sex\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`competitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`egt_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categorySettings\` text NOT NULL, \`competitionId\` int NULL, UNIQUE INDEX \`REL_3a331f712e3c11a91216cb67ca\` (\`competitionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`judgetoken\` ADD CONSTRAINT \`FK_cbb374409489d23cae54bf46705\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_link\` ADD CONSTRAINT \`FK_1638783642e81be92da5a7b3ef5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_link\` ADD CONSTRAINT \`FK_e1dd9878800b8c6d7426c139f49\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starter_link\` ADD CONSTRAINT \`FK_10525ba15e10d3473e34a254ceb\` FOREIGN KEY (\`starterId\`) REFERENCES \`starter\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starter_link\` ADD CONSTRAINT \`FK_b674ea1ebbf47c1f21b9d74995c\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`starter_link\` ADD CONSTRAINT \`FK_4801625c2832cf47e12dc851942\` FOREIGN KEY (\`clubId\`) REFERENCES \`club\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`grade\` ADD CONSTRAINT \`FK_1afdbe290bf308f1aa026807de6\` FOREIGN KEY (\`starterlinkId\`) REFERENCES \`starter_link\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` ADD CONSTRAINT \`FK_9a9c2a8811583a6c4990a36cdcd\` FOREIGN KEY (\`divisionId\`) REFERENCES \`egt_division\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` ADD CONSTRAINT \`FK_dd71206368b9957999dfa37c97e\` FOREIGN KEY (\`starterLinkId\`) REFERENCES \`starter_link\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` ADD CONSTRAINT \`FK_0fb120d0ca52186ce345b21f03a\` FOREIGN KEY (\`lineupId\`) REFERENCES \`egt_lineup\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_device\` ADD CONSTRAINT \`FK_5d15708ba753c786ecef3ab912d\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_lineup\` ADD CONSTRAINT \`FK_5789ab1cb8a7cd64180f47f8114\` FOREIGN KEY (\`divisionId\`) REFERENCES \`egt_division\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_lineup\` ADD CONSTRAINT \`FK_1d8ab525db1f8b7def1651982e2\` FOREIGN KEY (\`deviceId\`) REFERENCES \`egt_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_division\` ADD CONSTRAINT \`FK_82b263daf0a36015ce015852392\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`egt_settings\` ADD CONSTRAINT \`FK_3a331f712e3c11a91216cb67ca1\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`egt_settings\` DROP FOREIGN KEY \`FK_3a331f712e3c11a91216cb67ca1\``);
        await queryRunner.query(`ALTER TABLE \`egt_division\` DROP FOREIGN KEY \`FK_82b263daf0a36015ce015852392\``);
        await queryRunner.query(`ALTER TABLE \`egt_lineup\` DROP FOREIGN KEY \`FK_1d8ab525db1f8b7def1651982e2\``);
        await queryRunner.query(`ALTER TABLE \`egt_lineup\` DROP FOREIGN KEY \`FK_5789ab1cb8a7cd64180f47f8114\``);
        await queryRunner.query(`ALTER TABLE \`egt_device\` DROP FOREIGN KEY \`FK_5d15708ba753c786ecef3ab912d\``);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` DROP FOREIGN KEY \`FK_0fb120d0ca52186ce345b21f03a\``);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` DROP FOREIGN KEY \`FK_dd71206368b9957999dfa37c97e\``);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` DROP FOREIGN KEY \`FK_9a9c2a8811583a6c4990a36cdcd\``);
        await queryRunner.query(`ALTER TABLE \`grade\` DROP FOREIGN KEY \`FK_1afdbe290bf308f1aa026807de6\``);
        await queryRunner.query(`ALTER TABLE \`starter_link\` DROP FOREIGN KEY \`FK_4801625c2832cf47e12dc851942\``);
        await queryRunner.query(`ALTER TABLE \`starter_link\` DROP FOREIGN KEY \`FK_b674ea1ebbf47c1f21b9d74995c\``);
        await queryRunner.query(`ALTER TABLE \`starter_link\` DROP FOREIGN KEY \`FK_10525ba15e10d3473e34a254ceb\``);
        await queryRunner.query(`ALTER TABLE \`user_link\` DROP FOREIGN KEY \`FK_e1dd9878800b8c6d7426c139f49\``);
        await queryRunner.query(`ALTER TABLE \`user_link\` DROP FOREIGN KEY \`FK_1638783642e81be92da5a7b3ef5\``);
        await queryRunner.query(`ALTER TABLE \`judgetoken\` DROP FOREIGN KEY \`FK_cbb374409489d23cae54bf46705\``);
        await queryRunner.query(`DROP INDEX \`REL_3a331f712e3c11a91216cb67ca\` ON \`egt_settings\``);
        await queryRunner.query(`DROP TABLE \`egt_settings\``);
        await queryRunner.query(`DROP TABLE \`egt_division\``);
        await queryRunner.query(`DROP TABLE \`egt_lineup\``);
        await queryRunner.query(`DROP TABLE \`egt_device\``);
        await queryRunner.query(`DROP INDEX \`REL_dd71206368b9957999dfa37c97\` ON \`egt_starter_link\``);
        await queryRunner.query(`DROP TABLE \`egt_starter_link\``);
        await queryRunner.query(`DROP TABLE \`grade\``);
        await queryRunner.query(`DROP TABLE \`starter_link\``);
        await queryRunner.query(`DROP INDEX \`IDX_3e609edd13e9e6f9da575ec1e3\` ON \`starter\``);
        await queryRunner.query(`DROP TABLE \`starter\``);
        await queryRunner.query(`DROP INDEX \`IDX_79098e276529e2f823ab6379e8\` ON \`club\``);
        await queryRunner.query(`DROP TABLE \`club\``);
        await queryRunner.query(`DROP TABLE \`user_link\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`judgetoken\``);
        await queryRunner.query(`DROP TABLE \`competition\``);
    }

}
