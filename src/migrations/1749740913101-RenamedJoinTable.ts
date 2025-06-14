import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamedJoinTable1749740913101 implements MigrationInterface {
    name = 'RenamedJoinTable1749740913101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallpaper_tag" ("wallpaperId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_7791c750961024e2dea458dade0" PRIMARY KEY ("wallpaperId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c8742c93fd5d7b6ef2ec75fdc" ON "wallpaper_tag" ("wallpaperId") `);
        await queryRunner.query(`CREATE INDEX "IDX_60c3a2d90d3a0d0cbbf196fdad" ON "wallpaper_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "user_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dba55ed826ef26b5b22bd39409"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab40a6f0cd7d3ebfcce082131f"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60c3a2d90d3a0d0cbbf196fdad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c8742c93fd5d7b6ef2ec75fdc"`);
        await queryRunner.query(`DROP TABLE "wallpaper_tag"`);
    }

}
