export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // this take two arguments, the first one is the current instance of the error and the second one is the constructor function of the error. This will create a stack trace for the error and exclude the constructor function from the stack trace.
  }
}
