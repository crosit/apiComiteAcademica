import { Application } from "express";
import passport from "passport";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { DepartmentController } from "./department.controller";
import { validations } from "./department.zod";

const MODULE = "departments";
const BASE_URL = "/api/departments";
const departmentController = new DepartmentController();

export = (app: Application) => {
  app.post(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.CREATE,
    departmentController.store
  );
  app.get(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    departmentController.find
  );

  app.get(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    departmentController.findById
  );
  app.patch(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    validations.UPDATE,
    departmentController.update
  );
  app.delete(
    `${BASE_URL}/:id`,
    passport.authenticate("jwt", { session: false }),
    isAdminMiddleware,
    departmentController.delete
  );
};
