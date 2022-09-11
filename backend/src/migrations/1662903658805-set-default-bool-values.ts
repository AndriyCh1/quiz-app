import {MigrationInterface, QueryRunner} from "typeorm";

export class setDefaultBoolValues1662903658805 implements MigrationInterface {
    name = 'setDefaultBoolValues1662903658805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "published" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "quiz_answer" ALTER COLUMN "active" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz_answer" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quiz_question" ALTER COLUMN "active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "quiz" ALTER COLUMN "published" DROP DEFAULT`);
    }

}
