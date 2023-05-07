import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createTableUsers1681588331487 implements MigrationInterface {
    private realName = "users";
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
              name: "nombre",
              type: "varchar(200)",
              isNullable: false,
            },
            {
              name: "apellido_p",
              type: "varchar(250)",
              isNullable: false,
            },
            {
              name: "apellido_m",
              type: "varchar(250)",
              isNullable: false,
            },
            {
              name: "numero_control",
              type: "integer",
              isNullable: true,
            },
            {
              name: "correo",
              type: "varchar(255)",
              isNullable: false,
            },
            {
              name: "contraseña",
              type: "varchar(255)",
              isNullable: true,
            },
            {
              name: "telefono",
              type: "varchar(15)",
              isNullable: true,
            },
            {
              name: "tipoId",
              type: "int",
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
        "users",
        new TableForeignKey({
          columnNames: ["tipoId"],
          referencedColumnNames: ["id"],
          referencedTableName: "tipos",
        })
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable(this.realName);
      const tipoFk: any = table?.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("tipoID") !== -1
      );
      await queryRunner.dropForeignKey(this.realName, tipoFk);
      await queryRunner.dropTable(this.realName);
    }
  }
  