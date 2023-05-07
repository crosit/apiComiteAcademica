import { NextFunction, Request, Response } from 'express';
import { MiscService } from './misc.service';


export class MiscController {
    constructor() {}


    async getCountries(req: Request, res: Response, next: NextFunction) {
        const countryService: MiscService = new MiscService();
        try {
            const data = await countryService.getCountries();
            return res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getCountryById(req: Request, res: Response, next: NextFunction) {
        const countryService: MiscService = new MiscService();
        try {
            const data = await countryService.getCountryById(+req.params.id);
            return res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getStateByCountryId(req: Request, res: Response, next: NextFunction) {
        const countryService: MiscService = new MiscService();
        try {
            const data = await countryService.getStateByCountryId(+req.params.id);
            return res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }

    async getTaxSystem(req: Request, res: Response, next: NextFunction) {
        const countryService: MiscService = new MiscService();
        try {
            const data = await countryService.getTaxSystem();
            return res.status(data.statusCode).json(data);
        } catch (error) {
            next(error);
        }
    }
}