import { z, ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { ZodValidationError } from '../../shared/error-handler/custom-errors/http-zod-error.error';

export const validations = {
    CREATE: (req: Request, res: Response, next: NextFunction) => {
        try {
            const createPositionSchema = z.object({
                name: z.string().max(100),
                description: z.string().max(255),
                departmentId: z.number()
            });
            createPositionSchema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodValidationError({
                    name: 'Error creating position',
                    error: error,
                });
            }
        }
    },
    UPDATE: (req: Request, res: Response, next: NextFunction) => {
        try {
            const createPositionSchema = z.object({
                name: z.string().max(100).optional(),
                description: z.string().max(255).optional(),
                departmentId: z.number().optional()
            });
            createPositionSchema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new ZodValidationError({
                    name: 'Error creating position',
                    error: error,
                });
            }
        }
    }
}
