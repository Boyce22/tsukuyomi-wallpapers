import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTerTypeIdFromUuidToIncrement1755641870788 implements MigrationInterface {
    name = 'ChangeTerTypeIdFromUuidToIncrement1755641870788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "PK_7791c750961024e2dea458dade0"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "PK_60c3a2d90d3a0d0cbbf196fdadd" PRIMARY KEY ("tagId")`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c8742c93fd5d7b6ef2ec75fdc"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP COLUMN "wallpaperId"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD "wallpaperId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "PK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "PK_7791c750961024e2dea458dade0" PRIMARY KEY ("tagId", "wallpaperId")`);
        await queryRunner.query(`CREATE INDEX "IDX_5c8742c93fd5d7b6ef2ec75fdc" ON "wallpaper_tag" ("wallpaperId") `);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c8742c93fd5d7b6ef2ec75fdc"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "PK_7791c750961024e2dea458dade0"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "PK_60c3a2d90d3a0d0cbbf196fdadd" PRIMARY KEY ("tagId")`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP COLUMN "wallpaperId"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD "wallpaperId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_5c8742c93fd5d7b6ef2ec75fdc" ON "wallpaper_tag" ("wallpaperId") `);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "PK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "PK_7791c750961024e2dea458dade0" PRIMARY KEY ("wallpaperId", "tagId")`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
