import { AuthUser } from "../shared/types/user.types";

declare module "express-serve-static-core" {
    export interface Request {
        user: AuthUser;
    }
}