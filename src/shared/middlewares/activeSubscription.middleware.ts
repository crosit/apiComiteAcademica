import { Request, Response, NextFunction } from "express";

import { ClientRepository } from "../../components/client/client.repository";
import { UserService } from "../../components/user/user.service";
import { InactiveSubscription } from "../error-handler/custom-errors/inactive-subscription.error";
import { ForbiddenError } from "../error-handler/custom-errors/forbidden.error";
import { verifyToken } from "../../helpers/jwt";

const clientRepo = new ClientRepository();
const userService = new UserService();

const PUBLIC_ROUTES: string[] = [
  "/api/authenticate/login",
  "/api/authenticate/req-recover-pass",
];

export async function activeSubscriptionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    const isPublicRoute: boolean = PUBLIC_ROUTES.includes(req.path);
    if (isPublicRoute) {
      next();
      return;
    }
    next(new ForbiddenError());
    return;
  }
  const token: string = req.headers.authorization!.split(" ")[1];

  const p: string | null | any = verifyToken(token, {});
  if (!p) {
    next(new InactiveSubscription());
  }
  const user = await userService.getById(p.id);
  if (user.company.client.isActive) {
    next();
    return;
  }
  next(new InactiveSubscription());
}
