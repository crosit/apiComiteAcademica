import { DepartmentService } from './department.service';
import { NextFunction, Request, Response } from 'express';
import { PaginationRequestI } from 'src/shared/pagination/pagination.interface';
export class DepartmentController {
    contructor() { }

    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const departmentService: DepartmentService = new DepartmentService();
            const data = await departmentService.store(req.body);
            return res.status(data.statusCode).send(data)
        } catch (error) {
            next(error)
        }
    }

    async find(req: Request, res: Response, next: NextFunction) {
        try {
            const departmentService: DepartmentService = new DepartmentService();
            const data = await departmentService.find(req.query as any, +req.user.clientId);
            return res.status(data.statusCode).send(data)
        } catch (error) {
            next(error)
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const departmentService: DepartmentService = new DepartmentService();
            const data = await departmentService.findById(+req.params.id);
            return res.status(data.statusCode).send(data)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const departmentService: DepartmentService = new DepartmentService();
            const data = await departmentService.update(+req.params.id, req.body);
            return res.status(data.statusCode).send(data)
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const departmentService: DepartmentService = new DepartmentService();
            const data = await departmentService.delete(+req.params.id);
            return res.status(data.statusCode).send(data)
        } catch (error) {
            next(error)
        }
    }
}