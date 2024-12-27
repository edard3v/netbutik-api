export class UnauthorizedErr extends Error {
  msg: string;
  status: keyof typeof MSGS;
  constructor(status?: keyof typeof MSGS) {
    super();
    this.name = "UnauthorizedErr";
    this.status = status || 404;

    this.msg = MSGS[this.status];
  }
}

const MSGS = {
  404: "Necesita autorización.",
  401: "Token no autorizado.",
  403: "Rol no autorizado.",
} as const;
