import { z, ZodError } from "zod";

import { Request, Response, NextFunction } from "express";
import { ZodValidationError } from "../../shared/error-handler/custom-errors/http-zod-error.error";

export const validations = {
  CREATE: (req: Request, res: Response, next: NextFunction) => {
    try {
      const CreateCompanySchema = z.object({
        name: z.string(),
        rfc: z.string().min(18).max(19),
        clientId: z.number(),
        zipCode: z.number(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.number(),
        city: z.string(),
        country: z.string(),
        state: z.string(),
        taxSystem: z.string().max(20),
        alias: z.string(),
        photo: z.string().optional(),

      });
      CreateCompanySchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationError({
          name: "Error creating the company",
          error: error,
        });
      }
    }
  },
  UPDATE: (req: Request, res: Response, next: NextFunction) => {
    const EditCompanySchema = z.object({
      name: z.string().optional(),
      rfc: z.string().optional(),
      clientId: z.number().optional(),
      zipCode: z.number().max(8),
      neighborhood: z.string().optional(),
      street: z.string().optional(),
      number: z.number().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      state: z.string().optional(),
      taxSystem: z.string().max(20).optional(),
      alias: z.string().optional(),
      photo: z.string().optional(),
      status: z.boolean().optional(),
    });
    EditCompanySchema.parse(req.body);
    next();
  },
};
