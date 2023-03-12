import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnNameImageUrlToImagePathProductImagesTable1676826379400 implements MigrationInterface {
    name = 'UpdateColumnNameImageUrlToImagePathProductImagesTable1676826379400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" RENAME COLUMN "imageUrl" TO "imagePath"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" RENAME COLUMN "imagePath" TO "imageUrl"`);
    }

}
