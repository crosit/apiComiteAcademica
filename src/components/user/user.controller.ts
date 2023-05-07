import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service";
import { logError, logInfo } from "../../helpers/logs/logger";
import { Actions } from "../../helpers/logs/interfaces/logs.interface";

export class UserController {
  constructor() {}
  //   private userService: UserService = new UserService();
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      const newUser = await userService.store(req.body);
      return res.send({ data: newUser, success: true }).status(201);
    } catch (error: any) {
      next(error);
    }
  }
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();

      const users = await userService.getAll(req.query as any);
      return res.send({ data: users, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      const userExists = await userService.getById(+req.params.id);
      return res.send({ data: userExists, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      const data = await userService.update(req.body, +req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      const data = await userService.delete(+req.params.id);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
  async changeLanguage(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      userService.changeLanguage(req.body.language);
      const data = { language: req.body.language };
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }

  async misc(req: Request, res: Response, next: NextFunction) {
    try {
      const userService: UserService = new UserService();
      const data = await userService.misc(+req.user.clientId);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
}
