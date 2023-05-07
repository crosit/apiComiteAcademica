import { DataSource, Repository, InsertResult } from "typeorm";
import AppDataSource from "../../configs/database/datasource.config";

import { ClientEntity } from "./client.entity";

export class ClientRepository extends Repository<ClientEntity> {
  constructor() {
    super(ClientEntity, AppDataSource.createEntityManager());
  }

  async getClients(): Promise<ClientEntity[]> {
    return await this.find({});
  }

  async getClientById(id: number): Promise<ClientEntity | null> {
    return await this.findOne({
      where: { id },
    });
  }
}
