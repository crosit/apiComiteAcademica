import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createTableUsersDocumentos1682015754209 implements MigrationInterface {

    private realName = "usuarios_documentos";
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
              name: "usuarioId",
              type: "int",
              unsigned: true,
              isNullable: true,
            },
            {
              name: "documentoId",
              type: "int",
              unsigned: true,
              isNullable: true,
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
        "usuarios_documentos",
        new TableForeignKey({
          columnNames: ["usuarioId"],
          referencedColumnNames: ["id"],
          referencedTableName: "users",
        })
      );
      await queryRunner.createForeignKey(
        "usuarios_documentos",
        new TableForeignKey({
          columnNames: ["documentoId"],
          referencedColumnNames: ["id"],
          referencedTableName: "documentos",
        })
      );

     
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {

      const table = await queryRunner.getTable(this.realName);
      const usuarioFk: any = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("usuarioId") !== -1
      );
      const documentsFK: any = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("documentoId") !== -1
      );
      await queryRunner.dropForeignKey(this.realName, usuarioFk);
      await queryRunner.dropForeignKey(this.realName, documentsFK);

      await queryRunner.dropTable(this.realName);
    }
  }
  