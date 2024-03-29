import { MigrationInterface, QueryRunner } from "typeorm";

export class CompetitionLogo1711188837459 implements MigrationInterface {
    name = 'CompetitionLogo1711188837459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`competition\` ADD \`logoPath\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`competition\` DROP COLUMN \`logoPath\``);
    }

}
