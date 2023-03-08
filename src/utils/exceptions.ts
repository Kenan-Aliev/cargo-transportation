import { StatusCode } from "../enums/StatusCode";

export class ApiError extends Error {
  statusCode: StatusCode;
  constructor(msg: string, statusCode: StatusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
  static ClientError(msg: string) {
    return new ApiError(msg, StatusCode.ClientError);
  }
  static UnAuthorizedError(msg: string) {
    return new ApiError(msg, StatusCode.UnAuthorizedError);
  }
  static ValidationError(msg: string) {
    return new ApiError(msg, StatusCode.ValidationError);
  }
  static Forbidden(msg: string) {
    return new ApiError(msg, StatusCode.Forbidden);
  }
}
