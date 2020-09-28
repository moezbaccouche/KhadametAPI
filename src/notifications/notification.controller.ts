import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReceivedNotificationDto } from './DTOs/receivedNotification.dto';
import { Notification } from './notification.interface';
import { NotificationsService } from './notification.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('')
  findAll(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Notification> {
    return this.notificationsService.findOne(id);
  }

  @Post()
  create(@Body() newNotification: Notification): Promise<Notification> {
    return this.notificationsService.create(newNotification);
  }

  @Get('users/:id')
  findUserReceivedNotification(
    @Param('id') id: string,
  ): Promise<ReceivedNotificationDto[]> {
    return this.notificationsService.findUserReceivedNotification(id);
  }
}
