export class RecordNotFoundErr extends Error {
  msg: string;
  status: number;
  constructor() {
    super();
    this.name = "RecordNotFoundErr";
    this.msg = "Recurso no encontrado.";
    this.status = 404;
  }
}
