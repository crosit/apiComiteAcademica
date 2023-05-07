import { UpdateResult } from "typeorm";

import { CompanyEntity } from "./company.entity";
import { CompanyI } from "./company.types";
import { CompanyRepository } from "./company.repository";
import { HTTP404Error } from "../../shared/error-handler/custom-errors/http-404-error.error";
import { ALS } from "../../shared/local-storage/internationalization.storage";

export class CompanyService {
  constructor() {}
  private readonly companyRepository: CompanyRepository =
    new CompanyRepository();
  async store(paylod: CompanyI): Promise<CompanyEntity> {
    const newCompany = await this.companyRepository.storeCompany(paylod);
    return newCompany;
  }
  async getById(id: number): Promise<CompanyEntity> {
    const companyExists = await this.companyRepository.getCompanyById(id);
    if (!companyExists) {
      throw new HTTP404Error({
        name: `${ALS.getI18n().__("components.company.companyNotFound")} ${id}`,
        description: `${ALS.getI18n().__(
          "components.company.companyNotFound"
        )} ${id}`,
      });
    }
    return companyExists;
  }
  async getAll(clientId: number): Promise<CompanyEntity[]> {
    const companyExists = await this.companyRepository.getCompanies(clientId);
    if (companyExists.length === 0) {
      throw new HTTP404Error({
        name: `${ALS.getI18n().__("components.company.emptyCompanies")}`,
        description: `${ALS.getI18n().__(
          "components.company.emptyCompanies"
        )}`,
      });
    }
    return companyExists;
  }
  async update(paylod: CompanyI, id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.companyRepository.updateCompany(paylod, id);
    return data;
  }
  async delete(id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.companyRepository.deleteCompanyById(id);
    return data;
  }

  async misc() {
    return await this.companyRepository.misc();
  }
}
