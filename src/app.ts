import express, { Express, json } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/index.js";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "./types.js";
import { IExceptionFilter } from "./common/errors/exception-filter/models/index.js";
import { UsersController } from "./routers/users/controller/user-controller.js";
import { IConfigService } from "./config/models/index.js";
import { PrismaService } from "./database/prisma-service/index.js";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: LoggerService,
    @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
    @inject(TYPES.UsersController) private usersController: UsersController,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.app = express();
    this.port = 9000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
    this.prismaService = prismaService;
    this.configService = configService;
  }

  useMiddleware = () => {
    this.app.use(json());
  };

  useRouters = () => {
    this.app.use("/users", this.usersController.router);
  };

  useExceptionFilter = () => {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  };

  init = async () => {
    this.useMiddleware();
    this.useRouters();
    this.useExceptionFilter();
    this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на хосте http://localhost:${this.port}`);
  };
}
