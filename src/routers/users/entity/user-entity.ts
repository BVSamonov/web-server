import pkg from "bcryptjs";
import {} from "dotenv";
const { hash, compare } = pkg;

export class User {
  private _password: string;

  constructor(
    private readonly _name: string,
    private readonly _email: string,
    passwordHash?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  setPassword = async (password: string, rounds: number) => {
    if (!password) {
      return null;
    }

    const salt = await pkg.genSalt(rounds);
    this._password = await hash(password, salt);
  };

  compare = async (pass: string): Promise<boolean> => {
    return compare(pass, this._password);
  };
}
