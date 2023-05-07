import { BaseErrorConstructorType, ErrorTypeEnum } from "./error.types";
ErrorTypeEnum.OPERATIONAL;

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpStatusCode: number;
  public readonly isOperational: boolean;
  public readonly errorMessage: string;
  public readonly error: any;
  constructor({
    description,
    name,
    isOperational = false,
    httpStatusCode,
    error,
  }: BaseErrorConstructorType) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
    this.errorMessage = this.message;
    this.error = error;
  }
}
