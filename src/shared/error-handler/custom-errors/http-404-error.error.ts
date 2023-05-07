import { BaseError } from "../base-error.interface";
import {
  HttpStatusCodeEnum,
  BaseErrorConstructorType,
  CustomErrorConstructorType,
} from "../error.types";

export class HTTP404Error extends BaseError {
  constructor({ description = "", name = "" }: CustomErrorConstructorType) {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.NOT_FOUND,
      name,
    });
  }
}
