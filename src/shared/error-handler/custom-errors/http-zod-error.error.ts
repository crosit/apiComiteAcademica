import { ZodError } from "zod";
import { BaseError } from "../base-error.interface";
import { HttpStatusCodeEnum, CustomErrorConstructorType } from "../error.types";

export class ZodValidationError extends BaseError {
  constructor({
    name = "",
    error = null,
  }: {
    name: string;
    error: ZodError | null;
  }) {
    super({
      description: "Validation Errors",
      httpStatusCode: HttpStatusCodeEnum.VALIDATIONS,
      name,
      error: error?.issues.map((e) => {
        return {
          message: e.message,
          field: e.path[0] || "",
        };
      }),
    });
  }
}
