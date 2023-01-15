import {MigrationInterface, QueryRunner} from "typeorm";

export class addTakeQuestionAnswerEntities1672762085883 implements MigrationInterface {
    name = 'addTakeQuestionAnswerEntities1672762085883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "take_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "chosen" boolean NOT NULL DEFAULT false, "correct" boolean NOT NULL DEFAULT false, "questionId" uuid, CONSTRAINT "PK_c9e19933642b3d53fffc92378fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "take_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "score" integer NOT NULL, "content" character varying NOT NULL, "correctlyAnswered" boolean NOT NULL, "takeId" uuid, CONSTRAINT "PK_ec48dbc444fb1159b0dd7e9fdd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "take" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying, "currentScore" integer NOT NULL, "totalScore" integer NOT NULL, "quizId" uuid, "userId" uuid, CONSTRAINT "PK_62af097c3dfc39b32f2013bfa69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "take_answer" ADD CONSTRAINT "FK_a399ab4ba698af93e640ba2cf08" FOREIGN KEY ("questionId") REFERENCES "take_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "take_question" ADD CONSTRAINT "FK_a2914711b92cadc35265bd00d7c" FOREIGN KEY ("takeId") REFERENCES "take"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "take" ADD CONSTRAINT "FK_336543cf3ffa04a0df8354302d3" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE SET NULL ON UPDATE SET NULL`);
        await queryRunner.query(`ALTER TABLE "take" ADD CONSTRAINT "FK_84b6b2c258014d2a28b5e64b768" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" DROP CONSTRAINT "FK_84b6b2c258014d2a28b5e64b768"`);
        await queryRunner.query(`ALTER TABLE "take" DROP CONSTRAINT "FK_336543cf3ffa04a0df8354302d3"`);
        await queryRunner.query(`ALTER TABLE "take_question" DROP CONSTRAINT "FK_a2914711b92cadc35265bd00d7c"`);
        await queryRunner.query(`ALTER TABLE "take_answer" DROP CONSTRAINT "FK_a399ab4ba698af93e640ba2cf08"`);
        await queryRunner.query(`DROP TABLE "take"`);
        await queryRunner.query(`DROP TABLE "take_question"`);
        await queryRunner.query(`DROP TABLE "take_answer"`);
    }

}
