import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllTables1658390515293 implements MigrationInterface {
  name = 'AllTables1658390515293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "style" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_12a3ba7fe23b5386181ac6b0ac0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "username" character varying, "picture" character varying, "isSeller" boolean DEFAULT false, "socialId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_9bd2fe7a8e694dedc4ec2f666fe" UNIQUE ("socialId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying, "thumbnail" character varying, "openTime" character varying, "closeTime" character varying, "phoneNumber" character varying, "contents" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "zonecode" character varying, "roadAddress" character varying, "jibunAddress" character varying, "latitude" double precision, "longitude" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "storeId" integer, CONSTRAINT "UQ_7276bf3cdd7a47ababfb749bfc3" UNIQUE ("latitude"), CONSTRAINT "UQ_a95c27477a7d85b1f670682e1ba" UNIQUE ("longitude"), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_styles_style" ("user_id" integer NOT NULL, "style_id" integer NOT NULL, CONSTRAINT "PK_d249f476f1f715087a55b8ead15" PRIMARY KEY ("user_id", "style_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e6847178b6345f4332692a3def" ON "user_styles_style" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_10b49ebff794d3cd45ba7bfd47" ON "user_styles_style" ("style_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "store_styles_style" ("store_id" integer NOT NULL, "style_id" integer NOT NULL, CONSTRAINT "PK_0d7dfbdc002a484081787e115bc" PRIMARY KEY ("store_id", "style_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f5e29887f34242fbfdb0e6745" ON "store_styles_style" ("store_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_45dc3fe6ab1b27f83c59d7b9c9" ON "store_styles_style" ("style_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "store" ADD CONSTRAINT "FK_98ed391261cdba9f345e4ff24b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_6e7ea53c780aabbea983d443d8a" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_styles_style" ADD CONSTRAINT "FK_e6847178b6345f4332692a3def2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_styles_style" ADD CONSTRAINT "FK_10b49ebff794d3cd45ba7bfd47c" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_styles_style" ADD CONSTRAINT "FK_3f5e29887f34242fbfdb0e67450" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_styles_style" ADD CONSTRAINT "FK_45dc3fe6ab1b27f83c59d7b9c96" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "store_styles_style" DROP CONSTRAINT "FK_45dc3fe6ab1b27f83c59d7b9c96"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store_styles_style" DROP CONSTRAINT "FK_3f5e29887f34242fbfdb0e67450"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_styles_style" DROP CONSTRAINT "FK_10b49ebff794d3cd45ba7bfd47c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_styles_style" DROP CONSTRAINT "FK_e6847178b6345f4332692a3def2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_6e7ea53c780aabbea983d443d8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "store" DROP CONSTRAINT "FK_98ed391261cdba9f345e4ff24b3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_45dc3fe6ab1b27f83c59d7b9c9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f5e29887f34242fbfdb0e6745"`,
    );
    await queryRunner.query(`DROP TABLE "store_styles_style"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_10b49ebff794d3cd45ba7bfd47"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e6847178b6345f4332692a3def"`,
    );
    await queryRunner.query(`DROP TABLE "user_styles_style"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "store"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "style"`);
  }
}
