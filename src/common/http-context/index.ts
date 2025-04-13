import { Service } from "typedi";
import { Request, Response } from "express";

@Service()
export class HttpContextService {
  private req!: Request;
  private res!: Response;

  setContext(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  getRequest(): Request {
    if (!this.req) throw new Error("Request object not set");
    return this.req;
  }

  getResponse(): Response {
    if (!this.res) throw new Error("Response object not set");
    return this.res;
  }
}
