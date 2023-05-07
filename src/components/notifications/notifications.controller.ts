import { NextFunction, Request, Response } from "express";
import { WelcomingNotifications } from "../user/notifications/welcoming.notifications";

import { NotificationService } from "./notifications.service";
import { UserRepository } from "../user/user.repository";
import { NotificationDbService } from './notifications-db.service';
import { logError } from "../../helpers/logs/logger";
import { Actions } from "../../helpers/logs/interfaces/logs.interface";

export class NotificationController {
  constructor() { }
  async getNotifications(req: Request, res: Response, next: NextFunction) {
    const user = await new UserRepository().getUserById(1);
    const notificationService: NotificationService = new NotificationService(
      new WelcomingNotifications(user!)
    );
    const dbNotifications = new NotificationDbService();
    try {
      const notifications = await dbNotifications.getNotifications(+req.user.id, req.query as any);
      return res.send({ data: notifications, success: true }).status(200);
    } catch (error: any) {
      logError(Actions.GET, 'Error getting notifications', error.message, 'Notifications');
      next(error);
    }
  }

  async notify(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await new UserRepository().getUserById(1);

      const notificationService: NotificationService = new NotificationService(
        new WelcomingNotifications(user!)
      );

      await notificationService.notify();
      return res.send({ data: {}, success: true }).status(201);
    } catch (error: any) {
      next(error);
    }
  }

  async readNotification(req: Request, res: Response, next: NextFunction) {
    const dbNotifications = new NotificationDbService();
    try {
      const notification = await dbNotifications.readNotification(+req.params.id, +req.user.id);
      return res.status(notification.statusCode).send(notification)
    } catch (error: any) {
      logError(Actions.PATCH, 'Error reading notification', error.message, 'Notifications');
      next(error);
    }
  }

  async readAllNotifications(req: Request, res: Response, next: NextFunction) {
    const dbNotifications = new NotificationDbService();
    try {
      const notification = await dbNotifications.readAllNotifications(+req.user.id);
      return res.status(notification.statusCode).send(notification)
    } catch (error: any) {
      logError(Actions.PATCH, 'Error reading all notifications', error.message, 'Notifications');
      next(error);
    }
  }
}
