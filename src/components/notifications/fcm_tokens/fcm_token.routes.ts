import { Application } from "express";
import passport from "passport";

import { NotificationController } from "./fcm_token.controller";

const BASE_URL: string = "/api/notifications/fcmtokens";

export = (app: Application) => {
  const notificationController: NotificationController =
    new NotificationController();

  app.post(
    `${BASE_URL}`,
    passport.authenticate("jwt", { session: false }),
    notificationController.storeOrUpdateFcmToken
  );
};
