import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1752271054221 implements MigrationInterface {
    name = 'CreateInitialSchema1752271054221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "userName" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "birthDate" date, "email" character varying(255) NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "profilePictureUrl" character varying(255), "lastPasswordChange" TIMESTAMP NOT NULL DEFAULT '"2025-07-11T21:57:35.372Z"', "bannerUrl" character varying(255), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "createdById" uuid, "updatedById" uuid, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallpaper_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'REPORTED')`);
        await queryRunner.query(`CREATE TABLE "wallpaper" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" character varying(255), "originalUrl" character varying(255) NOT NULL, "thumbnailUrl" character varying(255) NOT NULL, "isMature" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "status" "public"."wallpaper_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileSize" double precision, "format" character varying(10), "viewCount" integer NOT NULL DEFAULT '0', "downloadCount" integer NOT NULL DEFAULT '0', "reportReason" character varying(512), "createdById" uuid, "updatedById" uuid, CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "wallpaper_tag" ("wallpaperId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_7791c750961024e2dea458dade0" PRIMARY KEY ("wallpaperId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5c8742c93fd5d7b6ef2ec75fdc" ON "wallpaper_tag" ("wallpaperId") `);
        await queryRunner.query(`CREATE INDEX "IDX_60c3a2d90d3a0d0cbbf196fdad" ON "wallpaper_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_ff8396e7449590638482a4d127d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_fd6ecce2d75fc83d305aa689420" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_cefe19d2794ecca8d4d3f273e69" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" ADD CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_60c3a2d90d3a0d0cbbf196fdadd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tag" DROP CONSTRAINT "FK_5c8742c93fd5d7b6ef2ec75fdc1"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_cefe19d2794ecca8d4d3f273e69"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_fd6ecce2d75fc83d305aa689420"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_ff8396e7449590638482a4d127d"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60c3a2d90d3a0d0cbbf196fdad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c8742c93fd5d7b6ef2ec75fdc"`);
        await queryRunner.query(`DROP TABLE "wallpaper_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dba55ed826ef26b5b22bd39409"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab40a6f0cd7d3ebfcce082131f"`);
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "wallpaper"`);
        await queryRunner.query(`DROP TYPE "public"."wallpaper_status_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
