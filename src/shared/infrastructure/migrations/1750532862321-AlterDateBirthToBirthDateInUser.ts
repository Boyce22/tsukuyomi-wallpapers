import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterDateBirthToBirthDateInUser1750532862321 implements MigrationInterface {
  name = 'AlterDateBirthToBirthDateInUser1750532862321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "dateBirth" TO "birthDate"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "birthDate" TO "dateBirth"`);
  }
}
