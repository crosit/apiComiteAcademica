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

  async getSolicitudes(clientId: number ): Promise<SolicitudEntity[]> {
    return await this.find({
      where: {
        id: clientId
      },
      
    });
  }
  async getSolicitudesById(id: number): Promise<SolicitudEntity[] > {
    console.log("id", id);
    
    return await this.find({
      where: {
        id:id
      },
      
    });
  }

  async storeSolicitudes(solicitud: SolicitudI): Promise<SolicitudEntity> {
    
    return await this.save(solicitud);
  }
  async updateSolicitudes(solicitud: SolicitudI, id: number): Promise<UpdateResult> {
    return await this.update({ id }, solicitud);
  }
  
  async deleteSolicitudesById(id: number): Promise<UpdateResult> {
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
