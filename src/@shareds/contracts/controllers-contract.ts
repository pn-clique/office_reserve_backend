import { Request, Response } from "express";

export interface _Controller {
  handle(request: Request, response: Response): Promise<Response>;
}