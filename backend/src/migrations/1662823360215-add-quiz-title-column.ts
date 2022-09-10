import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuizTitleColumn1662823360215 implements MigrationInterface {
    name = 'addQuizTitleColumn1662823360215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "title"`);
    }

}
