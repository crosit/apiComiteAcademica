import { DataSource } from "typeorm";
import { db_connections } from "./db-options.config";

const AppDataSource = new DataSource(db_connections.comite);
export default AppDataSource;
