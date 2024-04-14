import { MigrationInterface, QueryRunner } from "typeorm";

export class EgtDivisionStatetransition1713021736713 implements MigrationInterface {
    name = 'EgtDivisionStatetransition1713021736713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`egt_division\` ADD \`lastStateTransition\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`egt_division\` DROP COLUMN \`lastStateTransition\``);
    }

}
