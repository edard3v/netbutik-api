export class DtoErr extends Error {
  status: number;
  msg: string;
  constructor(params?: Constructor) {
    super();
    this.name = "DtoErr";
    this.msg = params?.msg ?? "Error de DTO";
    this.status = params?.status ?? 400;
  }
}

type Constructor = { status?: number; msg: string };
