import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDescriptionToNullableProductTable1676804574196 implements MigrationInterface {
    name = 'UpdateDescriptionToNullableProductTable1676804574196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "description" SET NOT NULL`);
    }

}
