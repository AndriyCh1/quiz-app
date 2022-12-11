import {MigrationInterface, QueryRunner} from "typeorm";

export class onDeleteCascadeForUserAndQuizAndAnswer1669243995455 implements MigrationInterface {
    name = 'onDeleteCascadeForUserAndQuizAndAnswer1669243995455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_52c158a608620611799fd63a927"`);
        await queryRunner.query(`ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_13b266ec53985f521fb503a072e"`);
        await queryRunner.query(`ALTER TABLE "quiz_answer" DROP CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57"`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_52c158a608620611799fd63a927" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_13b266ec53985f521fb503a072e" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_answer" ADD CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57" FOREIGN KEY ("questionId") REFERENCES "quiz_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_answer" DROP CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57"`);
        await queryRunner.query(`ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_13b266ec53985f521fb503a072e"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_52c158a608620611799fd63a927"`);
        await queryRunner.query(`ALTER TABLE "quiz_answer" ADD CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57" FOREIGN KEY ("questionId") REFERENCES "quiz_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_13b266ec53985f521fb503a072e" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_52c158a608620611799fd63a927" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
