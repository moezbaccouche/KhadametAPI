import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { RequestsService } from './request.service';
import { Request } from './request.interface';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('')
  findAll(): Promise<Request[]> {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Request> {
    return this.requestsService.findOne(id);
  }

  @Post()
  create(@Body() newRequest: Request): Promise<Request> {
    return this.requestsService.create(newRequest);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Request> {
    return this.requestsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequest: Request,
  ): Promise<Request> {
    return this.requestsService.update(id, updateRequest);
  }
}
