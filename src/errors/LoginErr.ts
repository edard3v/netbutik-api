export class LoginErr extends Error {
  msg: string;
  status: number;
  constructor() {
    super();
    this.name = "LoginErr";
    this.msg = "Inicio de sesión invalido";
    this.status = 401;
  }
}
