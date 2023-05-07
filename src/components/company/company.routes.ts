import { Application } from "express";
import passport from "passport";

import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { CompanyController } from "./company.controller";
import { validations } from "./company.zod";

const MODULE = "users";
const BASE_URL = "/api/company";

const companyController: CompanyController = new CompanyController();

export = (app: Application) => {
  app.get(
    BASE_URL,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.index
  );
  app.get(
    `${BASE_URL}/misc`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.misc
  )
  app.post(
    BASE_URL,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.CREATE,
    companyController.store
  );
  app.get(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.getById
  );
  app.patch(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.update
  );
  app.delete(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.delete
  );
};
