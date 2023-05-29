import { Request, Response, NextFunction } from "express";

import { UserService } from "../../components/user/user.service";
import { ForbiddenError } from "../error-handler/custom-errors/forbidden.error";

const userService = new UserService();

export async function isAdminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await userService.getById(req.user.id);
  console.log("user", req.user.id);
  
  next();
}
