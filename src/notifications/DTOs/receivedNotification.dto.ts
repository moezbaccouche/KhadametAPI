import { SimpleUserDto } from 'src/users/DTOs/simpleUser.dto';

export class ReceivedNotificationDto {
  constructor(
    public id: string,
    public sender: SimpleUserDto,
    public type: number,
    public createdAt: Date,
    public skillId?: string,
  ) {}
}
