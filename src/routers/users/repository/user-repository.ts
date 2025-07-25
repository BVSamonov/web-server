import { inject, injectable } from "inversify";
import { IUserRepository } from "./models";
import { TYPES } from "../../../types.js";
import { PrismaService } from "../../../database/prisma-service/index.js";
import { UserModel } from "@prisma/client";
import { IUser } from "../entity/models/index";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.prismaService = prismaService;
  }

  create = ({ name, password, email }: IUser): Promise<UserModel | null> => {
    return this.prismaService.client.userModel.create({
      data: {
        name,
        password,
        email,
        refreshToken: "",
      },
    });
  };

  find = (email: string): Promise<UserModel | null> => {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  };

  update = (refreshToken: string, email: string): Promise<UserModel | null> => {
    return this.prismaService.client.userModel.update({
      where: {
        email,
      },
      data: {
        refreshToken,
      },
    });
  };
}
