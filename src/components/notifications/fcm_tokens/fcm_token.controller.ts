import { NextFunction, Request, Response } from "express";

import { NotificationFcmTokenService } from "./fcm_token.service";

export class NotificationController {
  constructor() {}

  async storeOrUpdateFcmToken(req: Request, res: Response, next: NextFunction) {
    try {
      const fcmTokenService: NotificationFcmTokenService =
        new NotificationFcmTokenService();

      const resData = await fcmTokenService.store(req.user.id, req.body.token);
      return res.send({ data: resData, success: true }).status(201);
    } catch (error: any) {
      next(error);
    }
  }
}
