import {
  DataSource,
  In,
  InsertResult,
  Repository,
  UpdateResult,
} from "typeorm";

import AppDataSource from "../../../configs/database/datasource.config";
import { UserEntity } from "../../user/user.entity";
import { NotificationFcmTokenEntity } from "./fcm_token.entity";

export class NotificationFcmTokenRepository extends Repository<NotificationFcmTokenEntity> {
  constructor() {
    super(NotificationFcmTokenEntity, AppDataSource.createEntityManager());
  }

  async storeOrUpdateFcmToken(
    userId: number,
    token: string
  ): Promise<NotificationFcmTokenEntity | UpdateResult> {
    const userHasToken = await this.findOne({
      where: { userId },
      select: { id: true, fcmToken: true },
    });
    if (userHasToken) {
      return await this.update(
        { id: userHasToken.id },
        { fcmToken: userHasToken.fcmToken }
      );
    }
    return await this.save(this.create({ userId, fcmToken: token }));
  }
}
