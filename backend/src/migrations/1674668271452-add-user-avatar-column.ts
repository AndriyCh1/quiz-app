import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserAvatarColumn1674668271452 implements MigrationInterface {
    name = 'addUserAvatarColumn1674668271452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
