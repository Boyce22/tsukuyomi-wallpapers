import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusAndSetIsActiveDefault1751327472743 implements MigrationInterface {
    name = 'Name=AddStatusAndSetIsActiveDefault1751327472743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."wallpaper_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "status" "public"."wallpaper_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."wallpaper_status_enum"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

}
