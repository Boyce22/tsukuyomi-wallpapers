import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTerLastPasswordChangeFromTimestampToTimestampWithTimeZone1755643299285 implements MigrationInterface {
    name = 'ChangeTerLastPasswordChangeFromTimestampToTimestampWithTimeZone1755643299285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "assigned_at"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "assigned_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastPasswordChange"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastPasswordChange" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastPasswordChange"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastPasswordChange" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "assigned_at"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "assigned_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
