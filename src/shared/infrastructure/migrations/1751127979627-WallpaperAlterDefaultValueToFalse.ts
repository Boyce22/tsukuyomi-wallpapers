import { MigrationInterface, QueryRunner } from 'typeorm';

export class WallpaperAlterDefaultValueToFalse1751127979627 implements MigrationInterface {
  name = 'WallpaperAlterDefaultValueToFalse1751127979627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallpaper" ALTER COLUMN "isActive" SET DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallpaper" ALTER COLUMN "isActive" SET DEFAULT true`);
  }
}
