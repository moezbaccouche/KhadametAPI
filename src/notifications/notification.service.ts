import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimpleUserDto } from 'src/users/DTOs/simpleUser.dto';
import { UserDto } from 'src/users/DTOs/user.dto';
import { UsersService } from 'src/users/user.service';
import { ReceivedNotificationDto } from './DTOs/receivedNotification.dto';
import { Notification } from './notification.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Notification[]> {
    return await this.notificationModel.find();
  }

  async findOne(id: string): Promise<Notification> {
    return await this.notificationModel.findOne({ _id: id });
  }

  async create(notification: Notification): Promise<Notification> {
    const newNotification = new this.notificationModel(notification);
    return await newNotification.save();
  }

  async findUserReceivedNotification(
    id: string,
  ): Promise<ReceivedNotificationDto[]> {
    const notifications = await this.notificationModel
      .find({ receiverId: id })
      .sort({ createdAt: -1 });
    const notificationsToReturn: ReceivedNotificationDto[] = [];

    await Promise.all(
      notifications.map(async (notif: Notification) => {
        const sender = await this.usersService.findOne(notif.senderId);
        const senderDto = new SimpleUserDto(
          sender.id,
          sender.name,
          sender.picture,
        );
        const notificationDto = new ReceivedNotificationDto(
          notif.id,
          senderDto,
          notif.type,
          notif.createdAt,
          notif.skillId,
        );

        notificationsToReturn.push(notificationDto);
      }),
    );

    return notificationsToReturn;
  }
}
