import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTerLastPasswordChangeToNullAble1755643580448 implements MigrationInterface {
    name = 'ChangeTerLastPasswordChangeToNullAble1755643580448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastPasswordChange" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastPasswordChange" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastPasswordChange" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "lastPasswordChange" SET NOT NULL`);
    }

}
