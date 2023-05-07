import { BaseError } from "../base-error.interface";
import { HttpStatusCodeEnum } from "../error.types";
import { ALS } from "../../local-storage/internationalization.storage";
export class ForbiddenError extends BaseError {
  constructor() {
    super({
      description: ALS.getI18n().__("shared.errors.forbiddenError.description"),
      httpStatusCode: HttpStatusCodeEnum.FORBIDDEN,
      name: ALS.getI18n().__("shared.errors.forbiddenError.description"),
      error: null,
    });
  }
}
