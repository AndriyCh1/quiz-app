import {MigrationInterface, QueryRunner} from "typeorm";

export class extendsAbstractEntity1662741230437 implements MigrationInterface {
    name = 'extendsAbstractEntity1662741230437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "REL_94f168faad896c0786646fa3d4"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "UQ_94f168faad896c0786646fa3d4a" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "UQ_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "PK_82fae97f905930df5d62a702fc9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "token" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
