import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuizPublishedColumn1662903512660 implements MigrationInterface {
    name = 'addQuizPublishedColumn1662903512660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" RENAME COLUMN "active" TO "published"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quiz" RENAME COLUMN "published" TO "active"`);
    }

}
