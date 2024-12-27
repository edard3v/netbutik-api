import bcrypt from "bcrypt";

export class Bcrypt {
  static salt = 10;

  static hash(data: string) {
    return bcrypt.hashSync(data, this.salt);
  }

  static compare(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }
}
