import { Controller } from "../../../types";
import { Register } from "../register/registerSchema";
import { verifyRegisterService } from "./verifyRegisterService";

export const verifyRegisterController: Controller = async (_req, res, next) => {
  try {
    const register = res.locals?.tokenPayload as Register;
    await verifyRegisterService(register);
    res.status(201).send(page);
  } catch (error) {
    next(error);
  }
};

const page = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cuenta Creada</title>
          <style>
            body {
              display: grid;
              place-content: center;
              height: 100vh;
              margin: 0;
              background-color: #252525;

              div{
                max-width: 400px;
                display: grid;
                gap: 8px;
                justify-items: start;
                span {
                  color: #fff;
                  font-size: 1.5em;
                  }
                a {
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s;
                }
                a:hover {
                  background-color: #0056b3;
                }
              }
            }
          </style>
        </head>
        <body>
          <div>
            <span>¡Enhorabuena! Has verificado tu cuenta correctamente.</span>
            <a href="${process.env.CLIENT_BASE_URL}">Ir a ...</a>
          </div>
        </body>
      </html>
    `;
