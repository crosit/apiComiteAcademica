import { TemporalE } from "../entities/temporal.entity";
import { DeleteResult, Repository } from 'typeorm';
import { TemporalI } from "../interfaces/temporal.interface";
import { HTTP404Error } from '../../../shared/error-handler/custom-errors/http-404-error.error';
import AppDataSource from "../../../configs/database/datasource.config";
import { ALS } from "../../../shared/local-storage/internationalization.storage";


export class TemporalRepository extends Repository<TemporalE> {
    constructor(){
        super(TemporalE, AppDataSource.createEntityManager());
    }

    async storeTemportalToken(payload: TemporalI): Promise<TemporalE> {
        const newTemporal = this.create(payload);
        return await this.save(newTemporal);
    }


    async findById(id: number): Promise<TemporalE> {
        const data = await this.findOne({where: {id}});
        if (!data) {
            throw new HTTP404Error({
                name: ALS.getI18n().__("components.temporalToken.404Error"),
                description: ALS.getI18n().__("components.temporalToken.404Error"),
            })
        }
        return data;
    }

    async deleteTemporalToken(token: string, service: string ): Promise<DeleteResult> {
        return await this.delete({token, service});
    }

    async isValidToken(token: string, service: string): Promise<{message: string, active: boolean, recordId: number}> {
        const isValid = await this.findOne({where: {token, service}});

        if (!isValid) {
            return {
                message: ALS.getI18n().__("components.temporalToken.invalidToken"),
                active: false,
                recordId: 0
            }
        }

        if(new Date( isValid?.createdAt! ).getDate() != new Date().getDate()){
            return {
                message: ALS.getI18n().__("components.temporalToken.expiredToken"),
                active: false,
                recordId: 0
            }
        }
        return {
            message: ALS.getI18n().__("components.temporalToken.validToken"),
            active: true,
            recordId: isValid.recordId
        }
    }
}