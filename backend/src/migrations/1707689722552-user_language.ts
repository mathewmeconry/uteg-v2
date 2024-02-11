import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLanguage1707689722552 implements MigrationInterface {
    name = 'UserLanguage1707689722552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`language\` varchar(255) NOT NULL DEFAULT 'en'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`language\``);
    }

}
