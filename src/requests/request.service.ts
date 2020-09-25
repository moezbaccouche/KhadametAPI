import { Injectable } from '@nestjs/common';
import { Request } from './request.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestDto } from './DTOs/request.dto';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/user.service';
import { RequestStatus } from './request.status';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel('Request')
    private readonly requestModel: Model<Request>,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Request[]> {
    return await this.requestModel.find();
  }

  async findOne(id: string): Promise<Request> {
    return await this.requestModel.findOne({ _id: id });
  }

  async create(request: Request): Promise<Request> {
    console.log('REQUEST', request);
    const newRequest = new this.requestModel(request);
    return await newRequest.save();
  }

  async delete(id: string): Promise<Request> {
    return await this.requestModel.findByIdAndRemove(id);
  }

  async update(id: string, request: Request): Promise<RequestDto> {
    console.log('updatedRequest:', request);

    const updatedRequest: Request = await this.requestModel.findByIdAndUpdate(
      id,
      request,
      {
        useFindAndModify: false,
        new: true,
      },
    );

    const professional = await this.usersService.findProfessional(
      updatedRequest.professionalId,
    );

    const client = await this.usersService.findOne(updatedRequest.clientId);

    const requestToReturn = new RequestDto(
      updatedRequest.id,
      updatedRequest.skillId,
      client,
      updatedRequest.date,
      updatedRequest.address,
      updatedRequest.status,
      updatedRequest.createdAt,
      updatedRequest.description,
      professional,
    );
    return requestToReturn;
  }

  async findPendingRequestsForProfessional(
    professionalId: string,
  ): Promise<RequestDto[]> {
    const pendingRequests = await this.requestModel.find({
      professionalId,
      status: RequestStatus.PENDING,
    });
    let pendingRequestsToReturn: RequestDto[] = [];
    await Promise.all(
      pendingRequests.map(async (request: Request) => {
        const client = await this.usersService.findOne(request.clientId);
        pendingRequestsToReturn.push(
          new RequestDto(
            request.id,
            request.skillId,
            client,
            request.date,
            request.address,
            request.status,
            request.createdAt,
            request.description,
          ),
        );

        return pendingRequestsToReturn;
      }),
    );

    console.log('pendingRequestsToReturn', pendingRequestsToReturn);
    return pendingRequestsToReturn;
  }

  async findAcceptedRequestsForProfessional(
    professionalId: string,
  ): Promise<RequestDto[]> {
    const acceptedRequests = await this.requestModel.find({
      professionalId,
      status: RequestStatus.ACCEPTED,
    });
    let acceptedRequestsToReturn: RequestDto[] = [];
    await Promise.all(
      acceptedRequests.map(async (request: Request) => {
        const client = await this.usersService.findOne(request.clientId);
        acceptedRequestsToReturn.push(
          new RequestDto(
            request.id,
            request.skillId,
            client,
            request.date,
            request.address,
            request.status,
            request.createdAt,
            request.description,
          ),
        );

        return acceptedRequestsToReturn;
      }),
    );

    console.log('acceptedRequestsToReturn', acceptedRequestsToReturn);
    return acceptedRequestsToReturn;
  }

  async findTreatedRequestsForProfessional(
    professionalId: string,
  ): Promise<RequestDto[]> {
    const treatedRequests = await this.requestModel.find({
      professionalId,
      status: RequestStatus.TREATED,
    });
    let treatedRequestsToReturn: RequestDto[] = [];
    await Promise.all(
      treatedRequests.map(async (request: Request) => {
        const client = await this.usersService.findOne(request.clientId);
        treatedRequestsToReturn.push(
          new RequestDto(
            request.id,
            request.skillId,
            client,
            request.date,
            request.address,
            request.status,
            request.createdAt,
            request.description,
          ),
        );

        return treatedRequestsToReturn;
      }),
    );

    console.log('treatedRequestsToReturn', treatedRequestsToReturn);
    return treatedRequestsToReturn;
  }

  async findClientRequests(clientId: string): Promise<RequestDto[]> {
    const client = await this.usersService.findOne(clientId);
    const clientRequests = await this.requestModel
      .find({ clientId })
      .sort({ date: 'asc' });
    let requestsToReturn: RequestDto[] = [];
    await Promise.all(
      clientRequests.map(async (request: Request) => {
        const professional = await this.usersService.findProfessional(
          request.professionalId,
        );
        requestsToReturn.push(
          new RequestDto(
            request.id,
            request.skillId,
            client,
            request.date,
            request.address,
            request.status,
            request.createdAt,
            request.description,
            professional,
          ),
        );
      }),
    );
    return requestsToReturn;
  }
}
