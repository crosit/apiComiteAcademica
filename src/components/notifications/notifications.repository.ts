import { In, Repository, FindOptionsRelations, FindOptionsSelect, UpdateResult } from 'typeorm';

import AppDataSource from "../../configs/database/datasource.config";
import { CustomNotifiable } from "./interfaces/CustonNotifications.interface";

import { UserEntity } from "../user/user.entity";

import { NotificationEntity } from "./notifications.entity";
import { StoreNotificationI } from "./interfaces/notifications.types";
import { configPagination } from '../../shared/pagination/index';
import { PaginationRequestI, PaginationResult } from '../../shared/pagination/pagination.interface';
import { HTTP404Error } from '../../shared/error-handler/custom-errors/http-404-error.error';
import { ALS } from '../../shared/local-storage/internationalization.storage';
export class NotificationRepository extends Repository<NotificationEntity> {
  constructor() {
    super(NotificationEntity, AppDataSource.createEntityManager());
  }

  private readonly relations: FindOptionsRelations<NotificationEntity> = {
    receiver: true
  }
  private readonly selectOptions = (
    pag: boolean,
    one?: boolean
  ): FindOptionsSelect<NotificationEntity> => {
    return {
      id: true,
      content: pag,
      subject: pag,
      receiverId: pag,
      redirectUrl: pag,
      read: pag,
      createdAt: !!one,
      deletedAt: !!one,
      updatedAt: !!one,
      receiver: {
        id: true,
        firstname: pag,
        lastname: pag,
      }
    }
  }

  private readonly userRepository: Repository<UserEntity> =
    AppDataSource.getRepository(UserEntity);
  async getNotifiables(payload: CustomNotifiable): Promise<UserEntity[]> {
    let usersToNotify: UserEntity[] = [];
    if (payload.users) {
      const usersById: UserEntity[] = await this.userRepository.find({
        relations: { fcmToken: true },
        where: {
          id: In(payload.users),
        },
        select: { id: true, email: true, fcmToken: { fcmToken: true } },
      });

      usersToNotify = usersToNotify.concat(usersById);
    }
    return usersToNotify;
  }

  storeBulkNotifications(
    payload: StoreNotificationI[]
  ): Promise<NotificationEntity[]> {
    return this.save(this.create(payload));
  }

  // Get all current user notifications
  async getNotifications(
    userId: number,
    pagination: PaginationRequestI
  ): Promise<NotificationEntity[]> {
    const { sortBy, filters } = configPagination(pagination)
    const options = {
      relations: { ...this.relations },
      select: { ...this.selectOptions(true) },
      where: { receiverId: userId, ...filters },
      order: { [sortBy]: "DESC" },
    }
    return await this.find(options);
  }

  // read notification
  async readNotification(
    id: number,
    userId: number
  ): Promise<UpdateResult> {
    const data = await this.findOne({ where: { id, receiverId: userId } })
    if (!data) {
      throw new HTTP404Error({
        name: ALS.getI18n().__("components.notification.notificationNotFound"),
        description: ALS.getI18n().__("components.notification.notificationNotFound"),
      })
    }
    return await this.update(id, { read: true })
  }

  //Read all notifications
  async readAllNotifications(
    userId: number
  ): Promise<UpdateResult> {
    const data = await this.find({ where: { receiverId: userId, read: false } })
    const ids = data.map((item) => item.id)
    // bulk update
    return await this.update(ids, { read: true })
  }
}
