import { TemporalRepository } from './repository/temporal.repository';
import { TemporalE } from './entities/temporal.entity';
import { TemporalI } from './interfaces/temporal.interface';
import { HTTP404Error } from '../../shared/error-handler/custom-errors/http-404-error.error';
import { ALS } from "../../shared/local-storage/internationalization.storage";

export class TemporalService {
    constructor(){}
    private readonly temporalRepository: TemporalRepository = new TemporalRepository();

    async storeTemporalToken(payload: TemporalI): Promise<TemporalE> {
        return await this.temporalRepository.storeTemportalToken(payload);
    }

    async findById(id: number): Promise<TemporalE> {
        return await this.temporalRepository.findById(id);
    }

    async isValidToken(token: string, service: string): Promise<{message: string, active: boolean, recordId: number}> {
        return await this.temporalRepository.isValidToken(token, service);
    }

    async deleteTemporalToken(token: string, service: string ): Promise<void> {
        const data = await this.temporalRepository.findOne({where: {token, service}});
        if (!data) {
            throw new HTTP404Error({
                name: ALS.getI18n().__("components.temporalToken.404Error"),
                description: ALS.getI18n().__("components.temporalToken.404Error")
            })
        }
        await this.temporalRepository.delete({token, service});
    }
}