import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1749740551791 implements MigrationInterface {
    name = 'CreateInitialSchema1749740551791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallpaper" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "originalUrl" character varying NOT NULL, "thumbnailUrl" character varying NOT NULL, "isMature" boolean NOT NULL DEFAULT false, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fileSize" double precision, "format" character varying(10), "viewCount" integer NOT NULL DEFAULT '0', "downloadCount" integer NOT NULL DEFAULT '0', "createdById" uuid, "updatedById" uuid, "userId" uuid, CONSTRAINT "PK_fbf06d4e2d0d727c73a4eefab6a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdById" uuid, "updatedById" uuid, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallpaper_tags_tag" ("wallpaperId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_1708fc926dbde76470f710bd500" PRIMARY KEY ("wallpaperId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9240c32fd94d340f79f9095a0" ON "wallpaper_tags_tag" ("wallpaperId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5c3f368a862ed6f7583df76df" ON "wallpaper_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_fd6ecce2d75fc83d305aa689420" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_cefe19d2794ecca8d4d3f273e69" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_95750648eaa7419c0d81eeb6c6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_ff8396e7449590638482a4d127d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tags_tag" ADD CONSTRAINT "FK_b9240c32fd94d340f79f9095a07" FOREIGN KEY ("wallpaperId") REFERENCES "wallpaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tags_tag" ADD CONSTRAINT "FK_b5c3f368a862ed6f7583df76df0" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tags_tag" DROP CONSTRAINT "FK_b5c3f368a862ed6f7583df76df0"`);
        await queryRunner.query(`ALTER TABLE "wallpaper_tags_tag" DROP CONSTRAINT "FK_b9240c32fd94d340f79f9095a07"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_ff8396e7449590638482a4d127d"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_95750648eaa7419c0d81eeb6c6a"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_cefe19d2794ecca8d4d3f273e69"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_fd6ecce2d75fc83d305aa689420"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5c3f368a862ed6f7583df76df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9240c32fd94d340f79f9095a0"`);
        await queryRunner.query(`DROP TABLE "wallpaper_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "wallpaper"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
