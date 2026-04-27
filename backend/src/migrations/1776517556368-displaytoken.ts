import { MigrationInterface, QueryRunner } from 'typeorm';

export class Displaytoken1776517556368 implements MigrationInterface {
  name = 'Displaytoken1776517556368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`displaytoken\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ground\` int NOT NULL, \`token\` varchar(255) NOT NULL, \`competitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`displaytoken\` ADD CONSTRAINT \`FK_ba428bd002e1101e98c63acdf29\` FOREIGN KEY (\`competitionId\`) REFERENCES \`competition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`displaytoken\` DROP FOREIGN KEY \`FK_ba428bd002e1101e98c63acdf29\``,
    );
    await queryRunner.query(`DROP TABLE \`displaytoken\``);
  }
}
