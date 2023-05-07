import { Queue, QueueEvents, Worker } from "bullmq";
import { getMessaging, MulticastMessage } from "firebase-admin/messaging";

import config from "../../configs/envs";
import { UserEntity } from "../user/user.entity";
import {
  CustomNotification,
  NotificationJob,
  BroadCastStrategy,
} from "./interfaces/CustonNotifications.interface";
import {
  StoreNotificationI,
  PushNotificationPayload,
} from "./interfaces/notifications.types";
import { NotificationRepository } from "./notifications.repository";

export class NotificationService {
  private readonly CONNECTION = {
    host: config.cache.redis.REDIS_HOSTNAME,
    port: config.cache.redis.REDIS_PORT,
    db: +config.cache.redis.REDIS_DB,
  };
  private readonly customNotification: CustomNotification | null = null;
  private readonly notificationRepository: NotificationRepository =
    new NotificationRepository();
  private QUEUE_NAME: string = "notification-queue";
  constructor(customNotification: CustomNotification) {
    this.customNotification = customNotification;
  }

  async notify() {
    const notificationQueue: Queue = new Queue(this.QUEUE_NAME, {
      connection: this.CONNECTION,
      defaultJobOptions: { delay: 3000, attempts: 3 },
    });
    const job: NotificationJob = await this.setPayloadJob(
      this.customNotification
    );

    await notificationQueue.add("notification-job", job);
    new Worker(
      this.QUEUE_NAME,
      async (job) => {
        const jobNotification: NotificationJob = job.data;
        // Store Notifications DB
        const bulkNotifications: StoreNotificationI[] =
          jobNotification.notifiables.map((element: UserEntity) => {
            return {
              content: jobNotification.content,
              subject: jobNotification.subject,
              receiverId: element.id,
            };
          });
        this.notificationRepository.storeBulkNotifications(bulkNotifications);

        // PUSH
        if (jobNotification.strategies.includes(BroadCastStrategy.PUSH)) {
          const pushNotificationPayload: PushNotificationPayload = {
            subject: jobNotification.subject,
            content: jobNotification.content,
            usersToken: jobNotification.notifiables.map(
              (user: UserEntity) => user.fcmToken[0].fcmToken || ""
            ),
          };
          pushNotification(pushNotificationPayload);
        }
      },
      {
        connection: this.CONNECTION,
      }
    );
    const queueEvents = new QueueEvents(this.QUEUE_NAME, {
      connection: this.CONNECTION,
    });

    queueEvents.on("completed", ({ jobId }) => {
      console.log("done painting");
    });

    queueEvents.on(
      "failed",
      ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        console.error("error painting", failedReason);
      }
    );
  }

  private async setPayloadJob(
    customNotification: CustomNotification | null
  ): Promise<NotificationJob> {
    const notifiables: UserEntity[] =
      await this.notificationRepository.getNotifiables(
        customNotification!.getNotifiables()
      );

    return {
      key: customNotification!.getActionKey(),
      subject: customNotification!.getSubject(),
      text: customNotification!.getText(),
      smsText: customNotification!.getSmsText(),
      redirectUrl: "",
      notifiables,
      strategies: customNotification!.getBroadcastStrategies(),
      template: "",
      bodyEmail: "",
      content: customNotification!.getContent(),
    };
  }
}

const pushNotification = (payload: PushNotificationPayload) => {
  const registrationTokens: string[] = payload.usersToken;

  const message: MulticastMessage = {
    tokens: registrationTokens,
    notification: {
      title: payload.subject,
      body: payload.content,
    },
  };

  getMessaging()
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens: any = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx]);
          }
        });
        console.log("List of tokens that caused failures: " + failedTokens);
      }
    });
};
