import { z, ZodError } from "zod";

import { Request, Response, NextFunction } from "express";
import { ZodValidationError } from "../../shared/error-handler/custom-errors/http-zod-error.error";

export const validations = {
  CREATE: (req: Request, res: Response, next: NextFunction) => {
    try {
      const CreateUserSchema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        email: z.string(),
        companyId: z.number(),
      });
      CreateUserSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationError({
          name: "Error creating the user",
          error: error,
        });
      }
    }
  },
  UPDATE: (req: Request, res: Response, next: NextFunction) => {
    const EditUserSchema = z.object({
      firstname: z.string().optional(),
      lastname: z.string().optional(),
      email: z.string().optional(),
      companyId: z.number().optional(),
    });
    EditUserSchema.parse(req.body);
    next();
  },
};
