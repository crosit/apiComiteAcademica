export enum ErrorTypeEnum {
  OPERATIONAL = "OPERATIONAL",
  PROGRAMMER = "PROGRAMMER",
}

export interface BaseErrorConstructorType {
  httpStatusCode: HttpStatusCodeEnum;
  description: string;
  name: string;
  isOperational?: boolean;
  error?: any
}

export interface CustomErrorConstructorType {
  description?: string;
  name: string;
  error?: any;
}

export enum HttpStatusCodeEnum {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  CREATED = 201,
  VALIDATIONS = 422,
  FORBIDDEN = 403
}
