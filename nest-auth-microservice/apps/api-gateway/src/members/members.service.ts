import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, map } from 'rxjs';

@Injectable()
export class MembersService {
  constructor(@Inject(NATS_SERVICE) private readonly natsClient: ClientProxy) { }

  create(createMemberDto: CreateMemberDto, userId: string) {
    return this.natsClient.send('members.create', { ...createMemberDto, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  findAll(userId: string) {
    return this.natsClient.send('members.findAll', userId).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  findOne(id: number, userId: string) {
    return this.natsClient.send('members.findOne', { id, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  update(id: number, updateMemberDto: UpdateMemberDto, userId: string) {
    return this.natsClient.send('members.update', { id, updateMemberDto: { ...updateMemberDto, userId } }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }

  remove(id: number, userId: string) {
    return this.natsClient.send('members.remove', { id, userId }).pipe(
      map((response) => response),
      catchError((error) => {
        throw new RpcException(error.message);
      })
    );
  }
}
