import { RouteNotFoundHandler } from "../types";

export const routeNotFoundHandler: RouteNotFoundHandler = (_req, res) => {
  res
    .status(404)
    .json({ msg: "Mani te estás tirando un triple, revisa la ruta. 👀" });
};
