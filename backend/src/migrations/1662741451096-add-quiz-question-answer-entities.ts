import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuizQuestionAnswerEntities1662741451096 implements MigrationInterface {
    name = 'addQuizQuestionAnswerEntities1662741451096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."quiz_type_enum" AS ENUM('different', 'single-choice', 'multiple-choice', 'select', 'input')`);
        await queryRunner.query(`CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL, "type" "public"."quiz_type_enum" NOT NULL, "score" integer NOT NULL, "content" character varying NOT NULL, "time" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."quiz_question_type_enum" AS ENUM('single-choice', 'multiple-choice', 'select', 'input')`);
        await queryRunner.query(`CREATE TABLE "quiz_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active" character varying NOT NULL, "score" integer NOT NULL, "content" character varying NOT NULL, "type" "public"."quiz_question_type_enum" NOT NULL, "quizId" uuid, CONSTRAINT "PK_0bab74c2a71b9b3f8a941104083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active" boolean NOT NULL, "correct" boolean NOT NULL, "content" character varying NOT NULL, "questionId" uuid, CONSTRAINT "PK_926d49bc4559c8200b6c6c2c22f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "quiz" ADD CONSTRAINT "FK_52c158a608620611799fd63a927" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ADD CONSTRAINT "FK_13b266ec53985f521fb503a072e" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quiz_answer" ADD CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57" FOREIGN KEY ("questionId") REFERENCES "quiz_question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_answer" DROP CONSTRAINT "FK_fe27c8ed84eee5f742982ffff57"`);
        await queryRunner.query(`ALTER TABLE "quiz_question" DROP CONSTRAINT "FK_13b266ec53985f521fb503a072e"`);
        await queryRunner.query(`ALTER TABLE "quiz" DROP CONSTRAINT "FK_52c158a608620611799fd63a927"`);
        await queryRunner.query(`DROP TABLE "quiz_answer"`);
        await queryRunner.query(`DROP TABLE "quiz_question"`);
        await queryRunner.query(`DROP TYPE "public"."quiz_question_type_enum"`);
        await queryRunner.query(`DROP TABLE "quiz"`);
        await queryRunner.query(`DROP TYPE "public"."quiz_type_enum"`);
    }

}
