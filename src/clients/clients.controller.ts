import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.interface';
import { response } from 'express';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('')
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() newClient: Client): Promise<Client> {
    return this.clientsService.create(newClient);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Client> {
    return this.clientsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateClient: Client,
  ): Promise<Client> {
    return this.clientsService.update(id, updateClient);
  }
}
