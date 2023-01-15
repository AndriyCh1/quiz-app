import {MigrationInterface, QueryRunner} from "typeorm";

export class defValuesTakeAndQuestionEntities1672780800579 implements MigrationInterface {
    name = 'defValuesTakeAndQuestionEntities1672780800579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take_question" ADD "answered" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "take" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "take_question" ALTER COLUMN "score" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "take_question" ALTER COLUMN "correctlyAnswered" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "take" ALTER COLUMN "currentScore" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "take" ALTER COLUMN "totalScore" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" ALTER COLUMN "totalScore" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "take" ALTER COLUMN "currentScore" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "take_question" ALTER COLUMN "correctlyAnswered" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "take_question" ALTER COLUMN "score" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "take" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "take_question" DROP COLUMN "answered"`);
    }

}
