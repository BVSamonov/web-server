import { Request, Response, NextFunction } from "express";
import pkg from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { IMiddleware } from "../models";

const { verify } = pkg;

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute = (req: Request, res: Response, next: NextFunction) => {
    const { headers } = req;

    if (headers.authorization) {
      const token = headers.authorization.split(" ")[1];

      verify(token, this.secret, (error, payload) => {
        if (error) {
          next();
        } else if (payload && typeof payload !== "string") {
          req.user = payload.email;
        }
      });
    }
  };
}
