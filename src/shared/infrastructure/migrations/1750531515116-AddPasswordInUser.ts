import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordInUser1750531515116 implements MigrationInterface {
  name = 'AddPasswordInUser1750531515116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(100) NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS 'Hash da senha do usuário (máx. 100 caracteres).'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "user"."password" IS 'Hash da senha do usuário (máx. 100 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
