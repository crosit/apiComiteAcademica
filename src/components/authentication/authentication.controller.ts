import { NextFunction, Request, Response } from "express";
import { Actions } from "../../helpers/logs/interfaces/logs.interface";
import { logError } from "../../helpers/logs/logger";
import { AuthenticateService } from './authentication.service';

export class AuthenticateController {
  constructor() {}
  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticateService: AuthenticateService =
        new AuthenticateService();
      const signInResult = await authenticateService.signIn(req.body);
      return res.send({
        success: true,
        data: signInResult,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async requestRecoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticateService: AuthenticateService = new AuthenticateService();
      const data = await authenticateService.requestRecoverPassword(req.body.email);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      logError(Actions.POST, 'requestRecoverPassword', error.message, req.body.email)
      next(error);
    }
  }
  
  async recoverPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const authenticateService: AuthenticateService = new AuthenticateService();
      const data = await authenticateService.recoverPassword(req.params.token, req.body.password);
      return res.send({ data, success: true }).status(200);
    } catch (error: any) {
      next(error);
    }
  }
}
