import { BaseError } from "../base-error.interface";
import { HttpStatusCodeEnum } from "../error.types";

import { ALS } from "../../local-storage/internationalization.storage";

export class InactiveSubscription extends BaseError {
  constructor() {
    super({
      description: ALS.getI18n().__(
        "shared.errors.inactiveSubscription.description"
      ),
      httpStatusCode: HttpStatusCodeEnum.FORBIDDEN,
      name: ALS.getI18n().__("shared.errors.inactiveSubscription.name"),
      error: null,
    });
  }
}
