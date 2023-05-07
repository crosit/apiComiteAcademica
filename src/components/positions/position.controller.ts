import { PositionService } from "./position.service";
import { NextFunction, Request, Response } from 'express';
import { logError } from '../../helpers/logs/logger';
import { Actions } from "../../helpers/logs/interfaces/logs.interface";

export class PositionController {
    constructor() { }
    // private readonly positionService: PositionService

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const positionService: PositionService = new PositionService();
            const data = await positionService.getAll(req.query as any, +req.user.clientId);
            return res.status(data.statusCode).send(data)
        } catch (error: any) {
            logError(Actions.GET, 'error getting positions', error.message, 'position')
            next(error)
        }
    }

    async store(req: Request, res: Response, next: NextFunction) {
        console.log('store');
        try {
            const positionService: PositionService = new PositionService();
            const data = await positionService.store(req.body);
            return res.status(data.statusCode).send(data)
        } catch (error: any) {
            logError(Actions.POST, 'error getting positions', error.message, 'position')
            next(error)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const positionService: PositionService = new PositionService();
            const data = await positionService.getById(Number(req.params.id));
            return res.status(data.statusCode).send(data)
        } catch (error: any) {
            logError(Actions.GET, 'error getting position', error.message, 'position')
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const positionService: PositionService = new PositionService();
            const data = await positionService.update(Number(req.params.id), req.body);
            return res.status(data.statusCode).send(data)
        } catch (error: any) {
            logError(Actions.GET, 'error getting positions', error.message, 'position')
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const positionService: PositionService = new PositionService();
            const data = await positionService.delete(Number(req.params.id));
            return res.status(data.statusCode).send(data)
        } catch (error: any) {
            logError(Actions.GET, 'error getting positions', error.message, 'position')
            next(error)
        }
    }
}