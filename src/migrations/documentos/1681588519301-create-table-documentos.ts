import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createTableDocumentos1681588519301 implements MigrationInterface {

    private realName = "documentos";
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
              name: "url",
              type: "varchar(250)",
              isNullable: false,
            },
            {
              name: "estatusId",
              type: "integer",
              unsigned: true,
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
      await queryRunner.createForeignKey(
        this.realName,
        new TableForeignKey({
          columnNames: ["estatusId"],
          referencedColumnNames: ["id"],
          referencedTableName: "estatus",
        })
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable(this.realName);
      const tipoFk: any = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("estatusId") !== -1
      );
      await queryRunner.dropForeignKey(this.realName, tipoFk);
      await queryRunner.dropTable(this.realName);
    }
  }
  