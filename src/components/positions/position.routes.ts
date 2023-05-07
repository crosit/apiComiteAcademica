import { Application } from "express";
import passport from "passport";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { PositionController } from "./position.controller";
import { validations } from "./position.zod";

const MODULE = "positions";
const BASE_URL = "/api/positions";

const positionController: PositionController = new PositionController();

export = (app: Application) => {
  app.get(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    positionController.getAll
  );
  app.post(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.CREATE,
    positionController.store
  );

  app.get(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    positionController.getById
  );
  app.patch(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.UPDATE,
    positionController.update
  );
  app.delete(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    positionController.delete
  );
};
