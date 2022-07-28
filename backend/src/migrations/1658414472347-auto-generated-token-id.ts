import {MigrationInterface, QueryRunner} from "typeorm";

export class autoGeneratedTokenId1658414472347 implements MigrationInterface {
    name = 'autoGeneratedTokenId1658414472347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
    }

}