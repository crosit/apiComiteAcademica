import { DataSource, Repository, InsertResult, UpdateResult } from "typeorm";
import AppDataSource from "../../configs/database/datasource.config";

import { EstatusEntity } from "./company.entity";
import { EstatusI } from "./company.types";
import { MiscRepository } from '../misc/repository/misc.repository';

export class CompanyRepository extends Repository<EstatusEntity> {
  constructor() {
    super(EstatusEntity, AppDataSource.createEntityManager());
  }
  private readonly miscRepository: MiscRepository = new MiscRepository();

  async getCompanies(clientId: number ): Promise<EstatusEntity[]> {
    return await this.find({where: {id:clientId}});
  }

  async storeCompany(company: EstatusI): Promise<EstatusEntity> {
    return await this.save(company);
  }
  async updateCompany(company: EstatusI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, company);
  }
  async getCompanyById(id: number): Promise<EstatusEntity | null> {
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
