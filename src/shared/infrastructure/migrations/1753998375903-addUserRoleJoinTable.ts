import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRoleJoinTable1753998375903 implements MigrationInterface {
    name = 'AddUserRoleJoinTable1753998375903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab40a6f0cd7d3ebfcce082131f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dba55ed826ef26b5b22bd39409"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_dba55ed826ef26b5b22bd39409b" PRIMARY KEY ("roleId")`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_d0e5815877f7395a198a4cb0a46" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id")`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "assigned_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "assigned_at"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_f634684acb47c1a158b83af5150"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_d0e5815877f7395a198a4cb0a46" PRIMARY KEY ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_d0e5815877f7395a198a4cb0a46"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "roleId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_dba55ed826ef26b5b22bd39409b" PRIMARY KEY ("roleId")`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "PK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "PK_7b4e17a669299579dfa55a3fc35" PRIMARY KEY ("userId", "roleId")`);
        await queryRunner.query(`CREATE INDEX "IDX_dba55ed826ef26b5b22bd39409" ON "user_role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab40a6f0cd7d3ebfcce082131f" ON "user_role" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
