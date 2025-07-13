import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserLastPasswordChangeToTimestamp implements MigrationInterface {
  name = 'AlterUserLastPasswordChangeToTimestamp1752394087780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ALTER COLUMN "lastPasswordChange"
      SET DEFAULT now();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ALTER COLUMN "lastPasswordChange"
      SET DEFAULT null;
    `);
  }
}
