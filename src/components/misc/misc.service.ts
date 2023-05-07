import { MiscRepository } from './repository/misc.repository';
import { ResponseServiceI } from '../../helpers/responses/interface/response.interface';
import { ResponseService } from '../../helpers/responses/response.service';

export class MiscService {
    constructor() { }
    private readonly MiscRepository: MiscRepository = new MiscRepository();
    
    async getCountries(): Promise<ResponseServiceI> {
        const data = await this.MiscRepository.getCountries();
        return ResponseService(true, 'Countries', data, 200);
    }

    async getCountryById(id: number): Promise<ResponseServiceI> {
        const data = await this.MiscRepository.getCountryById(id);
        return ResponseService(true, 'Country', data, 200);
    }

    async getStateByCountryId(id: number): Promise<ResponseServiceI> {
        const data = await this.MiscRepository.getStateByCountryId(id);
        return ResponseService(true, 'State', data, 200);
    }

    async getTaxSystem(): Promise<ResponseServiceI> {
        const data = await this.MiscRepository.getTaxSystem();
        return ResponseService(true, 'Tax System', data, 200);
    }

}