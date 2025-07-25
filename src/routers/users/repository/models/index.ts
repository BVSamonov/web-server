import { UserModel } from "@prisma/client";
import { IUser } from "../../entity/models/index";

export interface IUserRepository {
  create: (user: IUser) => Promise<UserModel | null>;
  find: (email: string) => Promise<UserModel | null>;
  update: (refreshToken: string, email: string) => Promise<UserModel | null>;
}
