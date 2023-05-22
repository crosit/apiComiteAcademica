import { UpdateResult } from "typeorm";

import { SolicitudEntity } from "./solicitud.entity";
import { SolicitudI } from "./solicitud.types";
import { SolicitudRepository } from "./solicitud.repository";
import { HTTP404Error } from "../../shared/error-handler/custom-errors/http-404-error.error";
import { ALS } from "../../shared/local-storage/internationalization.storage";

export class SolicitudService {
  constructor() {}
  private readonly companyRepository: SolicitudRepository =
    new SolicitudRepository();
  async store(paylod: SolicitudI): Promise<SolicitudEntity> {
    const newCompany = await this.companyRepository.storeCompany(paylod);
    return newCompany;
  }
  async setDocument(payload: any, id: number) {
    console.log("payload", payload);
    let file = {
      url: payload.filename,
      originalName: payload.originalname,
    };
    return file;
  }
  async getById(id: number): Promise<SolicitudEntity> {
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
  async getAll(clientId: number): Promise<SolicitudEntity[]> {
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
  async update(paylod: SolicitudI, id: number): Promise<UpdateResult> {
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
