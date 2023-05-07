import { Application } from "express";
import passport from "passport";
import { isAdminMiddleware } from "../../shared/middlewares/isAdmin.middleware";
import { ProfileController } from "./profile.controller";

const MODULE = "profile";
const BASE_URL = "/api/profile";

const profileController: ProfileController = new ProfileController();

export = (app: Application) => {
  app.get(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    profileController.getProfile
  );
};
