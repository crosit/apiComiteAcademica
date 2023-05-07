import { DataSource, Repository, InsertResult, UpdateResult } from "typeorm";
import AppDataSource from "../../configs/database/datasource.config";

import { CompanyEntity } from "./company.entity";
import { CompanyI } from "./company.types";
import { MiscRepository } from '../misc/repository/misc.repository';

export class CompanyRepository extends Repository<CompanyEntity> {
  constructor() {
    super(CompanyEntity, AppDataSource.createEntityManager());
  }
  private readonly miscRepository: MiscRepository = new MiscRepository();

  async getCompanies(clientId: number ): Promise<CompanyEntity[]> {
    return await this.find({where: {clientId}});
  }

  async storeCompany(company: CompanyI): Promise<CompanyEntity> {
    return await this.save(company);
  }
  async updateCompany(company: CompanyI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, company);
  }
  async getCompanyById(id: number): Promise<CompanyEntity | null> {
    return await this.findOne({
      where: {
        id
      },
      relations: {
        client: true,
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
