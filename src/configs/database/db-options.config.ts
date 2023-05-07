import { DataSourceOptions } from "typeorm";
import config from "../envs";

export const db_connections: { comite: any } = {
  comite: {
    name: "comite-db",
    type: config.database.comite.COMITE_DB_CONNECTION,
    host: config.database.comite.COMITE_DB_HOST,
    port: +config.database.comite.COMITE_DB_PORT!,
    username: config.database.comite.COMITE_DB_USERNAME,
    password: config.database.comite.COMITE_DB_PASSWORD,
    database: config.database.comite.COMITE_DB_DATABASE,
    synchronize: false,
    logging: false,
    migrationsRun: false,
    entities: [config.database.comite.COMITE_ENTITIES],
    migrations: [config.database.comite.COMITE_MIGRATIONS],
    migrationsDir: config.database.comite.COMITE_MIGRATIONS_DIR,
    migrationsTableName: config.database.comite.COMITE_MIGRATIONS_TABLE_NAME,
  },
};
