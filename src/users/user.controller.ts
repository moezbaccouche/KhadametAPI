import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string): Promise<boolean> {
    return this.usersService.exists(email);
  }

  @Post()
  create(@Body() newUser: User): Promise<User> {
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: User): Promise<User> {
    return this.usersService.update(id, updateUser);
  }

  @Get('/search/:searchString')
  search(@Param('searchString') searchString: string): Promise<User[]> {
    return this.usersService.search(searchString);
  }

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ token: string; correctCredentials: boolean }> {
    console.log(credentials.email);
    const token = await this.usersService.login(
      credentials.email,
      credentials.password,
    );
    if (token) {
      return { token: token, correctCredentials: true };
    }
    return { token: null, correctCredentials: false };
  }

  @Get('skill/:id')
  findProfessionalsBySkill(@Param('id') skillId: string): Promise<any> {
    return this.usersService.findProfessionalsBySkill(skillId);
  }
}
