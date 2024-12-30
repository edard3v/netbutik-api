export class PageErr extends Error {
  status: number;
  msg: string;
  constructor(params?: Constructor) {
    super();
    this.name = "PageErr";
    this.msg = params?.msg ?? "No existe esta página";
    this.status = params?.status ?? 400;
  }
}

type Constructor = { status?: number; msg: string };
