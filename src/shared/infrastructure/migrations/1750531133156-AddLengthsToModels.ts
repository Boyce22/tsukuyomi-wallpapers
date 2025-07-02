import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLengthsToModels1750531133156 implements MigrationInterface {
  name = 'AddLengthsToModels1750531133156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."email" IS 'Endereço de e-mail do usuário, deve ser único (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."isVerified" IS 'Indica se o usuário foi verificado.'`);
    await queryRunner.query(`ALTER TABLE "user" ADD "profilePictureUrl" character varying(255)`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."profilePictureUrl" IS 'URL da foto de perfil do usuário (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "bannerUrl" character varying(255)`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."bannerUrl" IS 'URL do banner do perfil do usuário (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "role"."name" IS 'Nome único da role que identifica o conjunto de permissões (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "isActive" SET DEFAULT true`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS 'Nome próprio do usuário (máx. 50 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(50) NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS 'Sobrenome do usuário (máx. 50 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."userName" IS 'Nome de usuário único utilizado para login e identificação (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "tag"."name" IS 'Nome único da tag que identifica cada tag de forma exclusiva (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "description" character varying(255) NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "tag"."description" IS 'Descrição da tag, que explica seu significado ou contexto (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "wallpaper"."name" IS 'Nome do papel de parede (máx. 255 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "description" character varying(255)`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."description" IS 'Descrição detalhada do papel de parede (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "originalUrl"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "originalUrl" character varying(255) NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."originalUrl" IS 'URL original do arquivo da imagem (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "thumbnailUrl"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "thumbnailUrl" character varying(255) NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."thumbnailUrl" IS 'URL da miniatura (thumbnail) da imagem (máx. 255 caracteres).'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."format" IS 'Formato do arquivo (exemplo: jpg, png, gif, webp).'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "wallpaper"."format" IS 'Formato do arquivo (exemplo: jpg, png, gif).'`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."thumbnailUrl" IS 'URL da miniatura (thumbnail) da imagem (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "thumbnailUrl"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "thumbnailUrl" character varying NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."originalUrl" IS 'URL original do arquivo da imagem (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "originalUrl"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "originalUrl" character varying NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "wallpaper"."description" IS 'Descrição detalhada do papel de parede (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "wallpaper" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "wallpaper" ADD "description" text`);
    await queryRunner.query(`COMMENT ON COLUMN "wallpaper"."name" IS 'Nome do papel de parede.'`);
    await queryRunner.query(
      `COMMENT ON COLUMN "tag"."description" IS 'Descrição da tag, que explica seu significado ou contexto (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "description" character varying NOT NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "tag"."name" IS 'Nome único da tag que identifica cada tag de forma exclusiva (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."userName" IS 'Nome de usuário único utilizado para login e identificação (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."lastName" IS 'Sobrenome do usuário (máx. 50 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."name" IS 'Nome próprio do usuário (máx. 50 caracteres).'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "role" ALTER COLUMN "isActive" DROP DEFAULT`);
    await queryRunner.query(
      `COMMENT ON COLUMN "role"."name" IS 'Nome único da role que identifica o conjunto de permissões (máx. 50 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."bannerUrl" IS 'URL do banner do perfil do usuário (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bannerUrl"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."profilePictureUrl" IS 'URL da foto de perfil do usuário (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureUrl"`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."isVerified" IS 'Indica se o usuário foi verificado.'`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."email" IS 'Endereço de e-mail do usuário, deve ser único (máx. 255 caracteres).'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
  }
}
