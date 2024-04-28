import { MigrationInterface, QueryRunner } from 'typeorm';

export class EgtLineupRoundRemove1714321099524 implements MigrationInterface {
  name = 'EgtLineupRoundRemove1714321099524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`egt_lineup\` DROP COLUMN \`currentRound\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`egt_division\` ADD \`currentDeviceRound\` text NOT NULL DEFAULT ""`,
    );
    const divisions = await queryRunner.query(`SELECT * FROM \`egt_division\``);
    for (const division of divisions) {
      const maxRounds = division.sex === 'male' ? 5 : 4;
      if (division.currentDeviceRound.length !== maxRounds) {
        division.currentDeviceRound = new Array(maxRounds).fill(0).join(',');
        if (division.state === 'ENDED') {
          division.currentDeviceRound = new Array(maxRounds)
            .fill(maxRounds)
            .join(',');
        }
        await queryRunner.query(
          `UPDATE \`egt_division\` SET \`currentDeviceRound\` = ? WHERE \`id\` = ?`,
          [division.currentDeviceRound, division.id],
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`egt_division\` DROP COLUMN \`currentDeviceRound\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`egt_lineup\` ADD \`currentRound\` int NOT NULL DEFAULT 0`,
    );
  }
}
