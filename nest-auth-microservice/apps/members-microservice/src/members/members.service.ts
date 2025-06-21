import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaClient } from '../../generated/prisma';
import { OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MembersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(createMemberDto: CreateMemberDto) {
    const member = await this.member.findUnique({
      where: {
        email: createMemberDto.email,
        userId: createMemberDto.userId,
        available: true,
      },
    });
    if (member) {
      throw new RpcException({
        code: 400,
        message: 'Member already exists',
        error: 'Member already exists',
      });
    }

    try {
      return await this.member.create({
        data: {
          ...createMemberDto,
          userId: createMemberDto.userId,
        },
      });
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error creating member',
        error: error.message,
      });
    }
  }

  async findAll(userId: string) {
    try {
      return await this.member.findMany({
        where: {
          userId,
          available: true,
        },
      });
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error finding members',
        error: error.message,
      });
    }
  }

  async findOne(id: string, userId: string) {
    try {
      return await this.member.findUnique({
        where: {
          id,
          userId,
        },
      });
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error finding member',
        error: error.message,
      });
    }
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id, updateMemberDto.userId);
    if (!member) {
      throw new RpcException({
        code: 404,
        message: 'Member not found',
      });
    }
    if (member.userId !== updateMemberDto.userId) {
      throw new RpcException({
        code: 403,
        message: 'You are not authorized to update this member',
      });
    }
    try {
      return await this.member.update({
        where: {
          id,
          userId: updateMemberDto.userId,
          available: true,
        },
        data: {
          available: updateMemberDto.available,
          endDate: updateMemberDto.endDate,
          memberStatus: updateMemberDto.memberStatus,
          memberType: updateMemberDto.memberType,
          name: updateMemberDto.name,
          startDate: updateMemberDto.startDate,
          updatedAt: new Date(),
          email: updateMemberDto.email,
          userId: updateMemberDto.userId,
          id,
          createdAt: member.createdAt,
        },
      });
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error updating member',
        error: error.message,
      });
    }
  }

  async remove(id: string, userId: string) {
    try {
      return await this.member.update({
        where: {
          id,
          userId,
        },
        data: {
          available: false,
        },
      });
    } catch (error) {
      throw new RpcException({
        code: 500,
        message: 'Error removing member',
        error: error.message,
      });
    }
  }
}
