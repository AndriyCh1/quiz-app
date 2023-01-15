import {MigrationInterface, QueryRunner} from "typeorm";

export class addTakeTimeColumn1673641559682 implements MigrationInterface {
    name = 'addTakeTimeColumn1673641559682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" ADD "spentTime" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "take" DROP COLUMN "spentTime"`);
    }

}
