import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableVotos1685349665176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('votos', new TableColumn( {
            name: "voto",
            type: "boolean",
            
            
           
          },));
        await queryRunner.dropColumn('votos', 'numero_control');
          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('votos', new TableColumn( {
            name: "numero_control",
            type: "varchar",
            
            
           
          },));
        await queryRunner.dropColumn('votos', 'voto');
    }

}
