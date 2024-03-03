import { MigrationInterface, QueryRunner } from "typeorm";

export class JudgetokenToken1709488438648 implements MigrationInterface {
    name = 'JudgetokenToken1709488438648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`judgetoken\` ADD \`token\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`judgetoken\` DROP COLUMN \`token\``);
    }

}
