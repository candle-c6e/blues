import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePriceColumnProductTable1676804072186 implements MigrationInterface {
    name = 'UpdatePriceColumnProductTable1676804072186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "specialPrice" numeric(10,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "specialPrice"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
