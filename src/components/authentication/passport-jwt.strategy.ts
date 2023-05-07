import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import { Request } from "express";
import config from "../../configs/envs";
import { UserService } from "../user/user.service";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.authentication.jwt.JWT_SECRET,
  passReqToCallback: true,
};

// eslint-disable-next-line consistent-return
export default new Strategy(
  opts,
  async (req: Request, payload: any, done: any) => {    
    // if(req.header.) {
    //   return done(null, false)
    // }
    try {
      const userService: UserService = new UserService();
      const user = await userService.getById(payload.id);
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email,
          fullName: `${user.firstname} ${user.lastname}`,
          companyId: user.companyId,
          clientId: user.company.clientId
        });
      }
      return done(null, false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return done(error, false);
    }
  }
);
