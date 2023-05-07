import { z, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ZodValidationError } from '../../shared/error-handler/custom-errors/http-zod-error.error';

export const validations = {
    CREATE: (req: Request, res: Response, next: NextFunction) => {
        try {
            const createDepartmentSchema = z.object({
                name: z.string().max(100),
                description: z.string().max(255),
                companyId: z.number()
            })
            createDepartmentSchema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodValidationError({
                    name: 'Error creating department',
                    error: error,
                });
            }
        }
    },
    UPDATE: (req: Request, res: Response, next: NextFunction) => {
        try {
            const createDepartmentSchema = z.object({
                name: z.string().max(100).optional(),
                description: z.string().max(255).optional(),
                companyId: z.number().optional()
            })
            createDepartmentSchema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodValidationError({
                    name: 'Error updating department',
                    error: error,
                });
            }
        }
    }
}