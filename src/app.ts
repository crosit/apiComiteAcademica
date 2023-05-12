import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Application } from "express";
import helmet from "helmet";
import passport from "passport";

import i18n from "./internationalization/i18n.config";
import config from "./configs/envs";
import { errorHandler } from "./shared/error-handler/error-handler.interface";
import AppDataSource from "./configs/database/datasource.config";
import passportJwtStrategy from "./components/authentication/passport-jwt.strategy";
import { activeSubscriptionMiddleware } from "./shared/middlewares/activeSubscription.middleware";
import initiFirebase from "./configs/firebase/initi.firebase";

const PORT = config.PORT || 5050;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(i18n.init);
passport.use(passportJwtStrategy);

app.get("/readiness", (req, res) => {
  res.send("Readiness Probe");
});

initiFirebase;
// app.use(activeSubscriptionMiddleware);
require("./components/authentication/authentication.routes")(app);
require("./components/positions/position.routes")(app);
require("./components/company/company.routes")(app);
require("./components/user/user.routes")(app);
require("./components/misc/misc.routes")(app);
require("./components/profile/profile.routes")(app);
require("./components/departments/department.routes")(app);
require("./components/notifications/notifications.routes")(app);
require("./components/notifications/fcm_tokens/fcm_token.routes")(app);
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  const isTrusted = errorHandler.handleError(err);
  res.status(isTrusted.statusCode).send(isTrusted);
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await AppDataSource.initialize().then((response) => {
    console.log("DB OK!");
  });
});

export default app;
