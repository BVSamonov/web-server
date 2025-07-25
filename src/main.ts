import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app.js";
import { ConfigService } from "./config/config-service/index.js";
import { ExceptionFilter } from "./common/errors/exception-filter/index.js";
import { LoggerService } from "./logger/index.js";
import { UsersController } from "./routers/users/controller/user-controller.js";
import { TYPES } from "./types.js";
import "reflect-metadata";
import { UserService } from "./routers/users/service/user-service.js";
import { IConfigService } from "./config/models/index.js";
import { IUserService } from "./routers/users/service/models/index.js";
import { IUsersController } from "./routers/users/controller/models/index.js";
import { ILogger } from "./logger/models/index.js";
import { IExceptionFilter } from "./common/errors/exception-filter/models/index.js";
import { PrismaService } from "./database/prisma-service/index.js";
import { IUserRepository } from "./routers/users/repository/models/index.js";
import { UserRepository } from "./routers/users/repository/user-repository.js";

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IUsersController>(TYPES.UsersController).to(UsersController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind(TYPES.Application).to(App);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
});

const appContainer = new Container();
appContainer.load(appBindings);

const bootstrap = async () => {
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
};

bootstrap();
