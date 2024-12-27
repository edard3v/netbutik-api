export class EdarErr extends Error {
  status: number;
  msg: string;
  constructor({ status, msg }: Constructor) {
    super();
    this.name = "EdarErr";
    this.msg = msg;
    this.status = status;
  }
}

type Constructor = { status: number; msg: string };
