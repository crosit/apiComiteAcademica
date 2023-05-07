import { BaseError } from "./base-error.interface";

class ErrorHandler {
  public handleError(error: Error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }

    if (error instanceof BaseError) {
      return {
        error: error.error,
        message: error.message,
        success: false,
        statusCode: error.httpStatusCode,
        // isOperational: error.isOperational,
      };
    }
    return {
      error: null,
      message: error.message,
      success: false,
      statusCode: 500,
      // isOperational: false,
    };
  }
}
export const errorHandler = new ErrorHandler();
