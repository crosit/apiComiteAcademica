import { Application } from "express";
import passport from "passport";

import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { UserController } from "./user.controller";
import { validations } from "./user.zod";

const MODULE = "users";
const BASE_URL = "/api/user";

const userController: UserController = new UserController();

export = (app: Application) => {
  app.get(
    BASE_URL,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    userController.index
  );
  app.post(
    BASE_URL,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.CREATE,
    userController.store
  );
  app.post(
    `${BASE_URL}/language`,
    passport.authenticate("jwt", { session: false }),
    userController.changeLanguage
  );
  // app.get(
  //   `${BASE_URL}/misc`,
  //   passport.authenticate("jwt", { session: false }),
  //   isAdminMiddleware,
  //   userController.misc
  // )
  app.get(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    userController.getById
  );
  app.patch(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.UPDATE,
    userController.update
  );
  app.delete(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    userController.delete
  );
};
