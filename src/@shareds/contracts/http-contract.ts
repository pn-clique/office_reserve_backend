import { HttpStatusCode} from 'axios';

export type HttpResponse<T = any> =
  | HttpResponseType<T>
  | HttpResponseType<string>;

export class HttpResponseType<T = any> {
  status!: number;
  data!: T;
  constructor(input: HttpResponseType<T>) {
    Object.assign(this, input);
  }
}

export class HttpResponseTypeError<T = any> extends HttpResponseType<T> {
  constructor(input: HttpResponseTypeError<T>) {
    super(input);
  }
}

export class ErrorResponse extends HttpResponseTypeError {
  constructor(error: Error) {
    super({
      status: HttpStatusCode.InternalServerError,
      data: error.message,
    });
  }
}
export const errorResponse = (error: Error) => new ErrorResponse(error);

export class BadRequestResponse extends HttpResponseTypeError {
  constructor(message: string) {
    super({
      status: HttpStatusCode.BadRequest,
      data: message,
    });
  }
}

export const badRequestResponse = (data: { message: string }) =>
  new HttpResponseType({
    status: HttpStatusCode.BadRequest,
    data,
  });

export const successResponse = (data: any) =>
  new HttpResponseType({
    status: HttpStatusCode.Ok,
    data,
  });
