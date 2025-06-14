import { MigrationInterface, QueryRunner } from "typeorm";

export class UserWallpaperRemoval1749740833897 implements MigrationInterface {
    name = 'UserWallpaperRemoval1749740833897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP CONSTRAINT "FK_95750648eaa7419c0d81eeb6c6a"`);
        await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallpaper" ADD CONSTRAINT "FK_95750648eaa7419c0d81eeb6c6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
