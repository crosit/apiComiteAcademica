import { BaseError } from "../base-error.interface";
import {
  HttpStatusCodeEnum,
  BaseErrorConstructorType,
  CustomErrorConstructorType,
} from "../error.types";

export class HTTP400Error extends BaseError {
  constructor({ description = "", name = "" }: CustomErrorConstructorType) {
    super({
      description,
      httpStatusCode: HttpStatusCodeEnum.BAD_REQUEST,
      name,
    });
  }
}
