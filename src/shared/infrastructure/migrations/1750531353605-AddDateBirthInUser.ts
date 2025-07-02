import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateBirthInUser1750531353605 implements MigrationInterface {
  name = 'AddDateBirthInUser1750531353605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "dateBirth" date`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."dateBirth" IS 'Data de nascimento do usuário.'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "user"."dateBirth" IS 'Data de nascimento do usuário.'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "dateBirth"`);
  }
}
