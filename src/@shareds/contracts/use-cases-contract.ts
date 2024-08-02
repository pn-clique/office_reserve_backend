import { HttpResponse } from "./http-contract";

export interface UseCase<T = any, R = any> {
  execute(request: T): Promise<HttpResponse<R>>;
}