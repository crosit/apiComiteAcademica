import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTableEstatus1681588451938 implements MigrationInterface {

    
  
    private realName = "estatus";
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: this.realName,
          columns: [
            {
              name: "id",
              type: "int",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
              isNullable: false,
              unsigned: true,
            },
           
            {
              name: "descripcion",
              type: "varchar(250)",
              isNullable: false,
            },
           
            {
              name: "createdAt",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updatedAt",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "deletedAt",
              type: "timestamp",
              isNullable: true,
            },
          ],
        }),
        true
      );
     
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.realName);
    }
  }
  