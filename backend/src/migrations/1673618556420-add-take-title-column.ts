import {MigrationInterface, QueryRunner} from "typeorm";

export class addTakeTitleColumn1673618556420 implements MigrationInterface {
    name = 'addTakeTitleColumn1673618556420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" DROP COLUMN "title"`);
    }

}
