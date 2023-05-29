import { UpdateResult } from "typeorm";

import { SolicitudEntity } from "./solicitud.entity";
import { SolicitudI } from "./solicitud.types";
import { SolicitudRepository } from "./solicitud.repository";
import { HTTP404Error } from "../../shared/error-handler/custom-errors/http-404-error.error";
import { ALS } from "../../shared/local-storage/internationalization.storage";

export class SolicitudService {
  constructor() {}
  private readonly solicitudRepository: SolicitudRepository =
    new SolicitudRepository();
  async store(paylod: SolicitudI): Promise<SolicitudEntity> {
    const newsolicitud = await this.solicitudRepository.storeSolicitudes(paylod);
    return newsolicitud;
  }
  async setDocument(payload: any, id: number) {
    console.log("payload", payload);
    let file = {
      url: payload.filename,
      originalName: payload.originalname,
    };
    return file;
  }
  async getById(id: number): Promise<SolicitudEntity[]> {
    const solicitudExists = await this.solicitudRepository.getSolicitudesById(id);

    if (!solicitudExists) {
      throw new HTTP404Error({
        name: `${ALS.getI18n().__("components.solicitud.solicitudNotFound")} ${id}`,
        description: `${ALS.getI18n().__(
          "components.solicitud.solicitudNotFound"
        )} ${id}`,
      });
    }
    return solicitudExists;
  }
  async getAll(clientId: any): Promise<SolicitudEntity[]> {
    const solicitudExists = await this.solicitudRepository.getSolicitudes(clientId.id);
    
    if (solicitudExists.length === 0) {
      throw new HTTP404Error({
        name: `${ALS.getI18n().__("components.solicitud.emptyCompanies")}`,
        description: `${ALS.getI18n().__(
          "components.solicitud.emptyCompanies"
        )}`,
      });
    }
    return solicitudExists;
  }
  async update(paylod: SolicitudI, id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.solicitudRepository.updateSolicitudes(paylod, id);
    return data;
  }
  async delete(id: number): Promise<UpdateResult> {
    await this.getById(id);
    const data = await this.solicitudRepository.deleteSolicitudesById(id);
    return data;
  }

  async misc() {
    return await this.solicitudRepository.misc();
  }
}
