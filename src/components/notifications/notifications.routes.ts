import { Application } from "express";
import passport from "passport";
import { NotificationController } from "./notifications.controller";

const BASE_URL = "/api/notifications";

const notificationController: NotificationController =
  new NotificationController();

export = (app: Application) => {
  app.get(
    BASE_URL,
    passport.authenticate("jwt", { session: false }),
    notificationController.notify
  );
  app.get(
    `${BASE_URL}/get`,
    passport.authenticate("jwt", { session: false }),
    notificationController.getNotifications
  );
  app.patch(
    `${BASE_URL}/read-all`,
    passport.authenticate("jwt", { session: false }),
    notificationController.readAllNotifications
  )
  app.patch(
    `${BASE_URL}/read/:id`,
    passport.authenticate("jwt", { session: false }),
    notificationController.readNotification
  )
};
