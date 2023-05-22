import { DataSource, Repository, InsertResult, UpdateResult } from "typeorm";
import AppDataSource from "../../configs/database/datasource.config";

import { SolicitudEntity } from "./solicitud.entity";
import { MiscRepository } from '../misc/repository/misc.repository';
import { SolicitudI } from "./solicitud.types";

export class SolicitudRepository extends Repository<SolicitudEntity> {
  constructor() {
    super(SolicitudEntity, AppDataSource.createEntityManager());
  }
  private readonly miscRepository: MiscRepository = new MiscRepository();

  async getCompanies(clientId: number ): Promise<SolicitudEntity[]> {
    return await this.find();
  }

  async storeCompany(solicitud: SolicitudI): Promise<SolicitudEntity> {
    return await this.save(solicitud);
  }
  async updateCompany(solicitud: SolicitudI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, solicitud);
  }
  async getCompanyById(id: number): Promise<SolicitudEntity | null> {
    return await this.findOne({
      where: {
        id
      },
      
    });
  }
  async deleteCompanyById(id: number): Promise<UpdateResult> {
    return await this.softDelete({
      id,
    });
  }

  async misc(){
    const country = await this.miscRepository.getCountries();
    const taxSystem = await this.miscRepository.getTaxSystem();
    return { country,  taxSystem};
  }
}
