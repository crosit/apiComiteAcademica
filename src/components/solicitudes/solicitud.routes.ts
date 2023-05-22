import { Application } from "express";
import passport from "passport";

import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { CompanyController } from "./solicitud.controller";
import { validations } from "./solicitud.zod";

import {upload} from "../../shared/middlewares/multer";

const MODULE = "users";
const BASE_URL = "/api/solicitud";

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
  
  app.delete(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    companyController.delete
  );
  app.post(
    `${BASE_URL}/document`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    upload.single("file"),
    companyController.setDocument
  );
};
