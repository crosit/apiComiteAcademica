import { z, ZodError } from "zod";

import { Request, Response, NextFunction } from "express";
import { ZodValidationError } from "../../shared/error-handler/custom-errors/http-zod-error.error";

export const validations = {
  CREATE: (req: Request, res: Response, next: NextFunction) => {
    try {
      const SignInSchema = z.object({
        email: z.string().email(),
        password: z.string(),
      });
      SignInSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationError({
          name: "Error Sign In",
          error: error,
        });
      }
    }
  },
  RECOVER: (req: Request, res: Response, next: NextFunction) => {
    try {
      const requesRecoverSchema = z.object({
        email: z.string().email(),
      });
      requesRecoverSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationError({
          name: "Error Sign In",
          error: error,
        });
      }
    }
  }
};
