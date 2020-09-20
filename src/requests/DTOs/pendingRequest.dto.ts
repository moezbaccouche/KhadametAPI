import { ProfessionalForProfileDto } from 'src/users/DTOs/ProfessionalForProfile.dto';
import { UserDto } from 'src/users/DTOs/user.dto';

export class RequestDto {
  constructor(
    public id: string,
    public skillId: string,
    public client: UserDto,
    public date: Date,
    public address: string,
    public status: number,
    public createdAt: Date,
    public description?: string,
    public professional?: ProfessionalForProfileDto,
  ) {}
}
