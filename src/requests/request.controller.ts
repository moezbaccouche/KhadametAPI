import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { RequestsService } from './request.service';
import { Request } from './request.interface';
import { RequestDto } from './DTOs/request.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequest: Request,
  ): Promise<RequestDto> {
    console.log(updateRequest);
    return this.requestsService.update(id, updateRequest);
  }

  @Get('pending/:id')
  findPendingRequestsForProfessional(
    @Param('id') professionalId: string,
  ): Promise<RequestDto[]> {
    return this.requestsService.findPendingRequestsForProfessional(
      professionalId,
    );
  }

  @Get('accepted/:id')
  findAcceptedRequestsForProfessional(
    @Param('id') professionalId: string,
  ): Promise<RequestDto[]> {
    return this.requestsService.findAcceptedRequestsForProfessional(
      professionalId,
    );
  }

  @Get('treated/:id')
  findAcceptedTreatedForProfessional(
    @Param('id') professionalId: string,
  ): Promise<RequestDto[]> {
    return this.requestsService.findTreatedRequestsForProfessional(
      professionalId,
    );
  }

  @Get('clients/:id')
  findClientRequests(@Param('id') clientId: string): Promise<RequestDto[]> {
    return this.requestsService.findClientRequests(clientId);
  }
}
