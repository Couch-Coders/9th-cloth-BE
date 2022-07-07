import {MigrationInterface, QueryRunner} from "typeorm";

export class AllTables1657189299175 implements MigrationInterface {
    name = 'AllTables1657189299175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "style" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_12a3ba7fe23b5386181ac6b0ac0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "email" character varying, "username" character varying, "profile" character varying, "isSeller" boolean DEFAULT false, "socialId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "name" character varying, "thumbnail" character varying, "openTime" character varying, "closeTime" character varying, "phoneNumber" character varying, "contents" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_styles_style" ("user_id" integer NOT NULL, "style_id" integer NOT NULL, CONSTRAINT "PK_d249f476f1f715087a55b8ead15" PRIMARY KEY ("user_id", "style_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e6847178b6345f4332692a3def" ON "user_styles_style" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_10b49ebff794d3cd45ba7bfd47" ON "user_styles_style" ("style_id") `);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_98ed391261cdba9f345e4ff24b3" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_styles_style" ADD CONSTRAINT "FK_e6847178b6345f4332692a3def2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_styles_style" ADD CONSTRAINT "FK_10b49ebff794d3cd45ba7bfd47c" FOREIGN KEY ("style_id") REFERENCES "style"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_styles_style" DROP CONSTRAINT "FK_10b49ebff794d3cd45ba7bfd47c"`);
        await queryRunner.query(`ALTER TABLE "user_styles_style" DROP CONSTRAINT "FK_e6847178b6345f4332692a3def2"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_98ed391261cdba9f345e4ff24b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10b49ebff794d3cd45ba7bfd47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6847178b6345f4332692a3def"`);
        await queryRunner.query(`DROP TABLE "user_styles_style"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "style"`);
    }

}
