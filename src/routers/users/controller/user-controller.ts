import { Response, Request, NextFunction } from "express";
import { BaseController } from "../../../common/controllers/base-controller/index.js";
import { HTTPError } from "../../../common/errors/http-error/index.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../types.js";
import { ILogger } from "../../../logger/models/index.js";
import "reflect-metadata";
import { IUsersController } from "./models/index.js";
import { UserLogin } from "../dto/user-login/index.js";
import { UserRegister } from "../dto/user-register/index.js";
import { IUserService } from "../service/models/index.js";
import { ValidateMiddleware } from "../../../common/controllers/middleware/validate-middleware/index.js";
import pkg from "jsonwebtoken";
import { IConfigService } from "../../../config/models/index.js";

const { sign } = pkg;

@injectable()
export class UsersController
  extends BaseController
  implements IUsersController
{
  HTTPError: HTTPError;

  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRouters([
      { path: "/all", method: "get", func: this.all },
      { path: "/person", method: "get", func: this.person },
      { path: "/error", method: "get", func: this.error },
      {
        path: "/login",
        method: "get",
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLogin)],
      },
      {
        path: "/register",
        method: "get",
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegister)],
      },
    ]);
  }

  all = (req: Request, res: Response, next: NextFunction) => {
    const response = res.json({ users: "all" });

    this.ok(response, "Success!");
  };

  person = (req: Request, res: Response, next: NextFunction) => {
    this.ok(res, "Success!");
  };

  login = async (
    { body }: Request<object, object, UserLogin>,
    res: Response,
    next: NextFunction,
  ) => {
    const { status, name } = await this.userService.validateUser(body);

    if (!status) {
      return next(new HTTPError(403, "Email или password введен не верно!"));
    }

    const { email } = body;

    const jwtAccess = await this.generateAccessToken(
      email,
      this.configService.get("ACCESS_TOKEN"),
    );
    const jwtRefresh = await this.generateRefreshToken(
      email,
      this.configService.get("REFRESH_TOKEN"),
    );

    this.userService.updateUserToken(email, jwtRefresh);

    this.ok(res, {
      status: `Добро пожаловать, ${name}`,
      jwt: jwtAccess,
      jwtRefresh: jwtRefresh,
    });
  };

  register = async (
    { body }: Request<object, object, UserRegister>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(
        new HTTPError(422, "Пользователь с таким email уже зарегистрирован"),
      );
    }

    this.ok(res, {
      name: result.name,
      email: result.email,
      id: result.id,
      message: "Аккаунт создан!",
    });
  };

  private generateAccessToken = async (
    email: string,
    secret: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
        },
        secret,
        { expiresIn: "5m", algorithm: "HS256" },
        (error, encoded) => {
          if (error) {
            reject(error);
          }

          resolve(String(encoded));
        },
      );
    });
  };

  private generateRefreshToken = async (
    email: string,
    secret: string,
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
        },
        secret,
        { expiresIn: "15m" },
        (error, encoded) => {
          if (error) {
            reject(error);
          }

          resolve(String(encoded));
        },
      );
    });
  };

  error = (req: Request, res: Response, next: NextFunction) => {
    next(
      new HTTPError(
        404,
        "Incorrect request from the frontend side",
        "users/error",
      ),
    );
  };
}
