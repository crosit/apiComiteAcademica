import { InsertResult, UpdateResult } from "typeorm";
import i18n from "i18n";

import { NotificationFcmTokenRepository } from "./fcm_token.repository";
import { ALS } from "../../../shared/local-storage/internationalization.storage";
import { NotificationFcmTokenEntity } from "./fcm_token.entity";

export class NotificationFcmTokenService {
  constructor() {}
  private readonly notificationFcmTokenRepository: NotificationFcmTokenRepository =
    new NotificationFcmTokenRepository();

  async store(
    userId: number,
    token: string
  ): Promise<NotificationFcmTokenEntity | UpdateResult> {
    return await this.notificationFcmTokenRepository.storeOrUpdateFcmToken(
      userId,
      token
    );
  }
}
