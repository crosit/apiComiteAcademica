import { Application } from "express";
import { AuthenticateController } from "./authentication.controller";
import { validations } from "./authentication.zod";

const BASE_URL: string = "/api/authenticate";

export = (app: Application) => {
  const authenticateController: AuthenticateController =
    new AuthenticateController();

  app.post(`${BASE_URL}/login`, validations.CREATE, authenticateController.signIn);
  app.post(`${BASE_URL}/req-recover-pass`, validations.RECOVER, authenticateController.requestRecoverPassword);

  app.patch(`${BASE_URL}/recover-pass/:token`, authenticateController.recoverPassword);
};
