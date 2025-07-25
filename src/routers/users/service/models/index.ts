import { UserModel } from "@prisma/client";
import { UserLogin } from "../../dto/user-login/index.js";
import { UserRegister } from "../../dto/user-register/index.js";

export interface ICheckedUser {
  status: boolean;
  name?: string;
}

export interface IUserService {
  createUser: (dto: UserRegister) => Promise<UserModel | null>;
  validateUser: (dto: UserLogin) => Promise<ICheckedUser>;
  updateUserToken: (
    email: string,
    refreshToken: string,
  ) => Promise<ICheckedUser>;
}
