import { NotificationRepository } from './notifications.repository';
import { PaginationRequestI } from '../../shared/pagination/pagination.interface';
import { ResponseServiceI } from '../../helpers/responses/interface/response.interface';
import { ResponseService } from '../../helpers/responses/response.service';

export class NotificationDbService {

    constructor() { }

    private readonly notificationRepository: NotificationRepository =
        new NotificationRepository();

    async getNotifications(
        userId: number,
        pagination: PaginationRequestI
    ): Promise<ResponseServiceI> {
        const data = await this.notificationRepository.getNotifications(userId, pagination);
        return ResponseService(true, "Notifications found", data, 200);
    }

    async readNotification(
        id: number,
        userId: number
    ): Promise<ResponseServiceI> {
        const data = await this.notificationRepository.readNotification(id, userId);
        return ResponseService(true, "Notification read", data, 200);
    }

    async readAllNotifications(
        userId: number
    ): Promise<ResponseServiceI> {
        const data = await this.notificationRepository.readAllNotifications(userId);
        return ResponseService(true, "Notifications read", data, 200);
    }

}