import { MigrationInterface, QueryRunner } from "typeorm";

export class StarterlinkSoftdelete1713023373365 implements MigrationInterface {
    name = 'StarterlinkSoftdelete1713023373365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`starter_link\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`egt_starter_link\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`starter_link\` DROP COLUMN \`deletedAt\``);
    }

}
