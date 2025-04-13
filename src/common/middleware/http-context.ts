import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { HttpContextService } from "../http-context";

export function HttpContextMiddleware(req: Request, res: Response, next: NextFunction) {
  const httpContext = Container.get(HttpContextService);
  httpContext.setContext(req, res);
  //console.log("from context middleware", httpContext);
  next();
}
  