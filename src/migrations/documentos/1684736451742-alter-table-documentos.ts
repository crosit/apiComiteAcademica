import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableDocumentos1684736451742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('documentos', new TableColumn( {
            name: "nombreDocumento",
            type: "varchar",
            
            
           
          },));
          await queryRunner.query('ALTER TABLE documentos ALTER COLUMN estatusId SET DEFAULT 1');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('documentos', 'nombreDocumento');
        await queryRunner.query('ALTER TABLE documentos ALTER COLUMN estatusId DROP DEFAULT');
    }

}
