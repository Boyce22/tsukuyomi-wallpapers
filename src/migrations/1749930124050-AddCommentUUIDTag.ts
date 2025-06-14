import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentUUIDTag1749930124050 implements MigrationInterface {
    name = 'AddCommentUUIDTag1749930124050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`COMMENT ON COLUMN "tag"."id" IS 'Identificador único da tag, gerado automaticamente.'`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`COMMENT ON COLUMN "tag"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
