import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUniqueEmailUserTable1676712975097 implements MigrationInterface {
    name = 'UpdateUniqueEmailUserTable1676712975097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
    }

}
