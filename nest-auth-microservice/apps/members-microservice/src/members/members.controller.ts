import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller()
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @MessagePattern('members.create')
  create(@Payload() createMemberDto: CreateMemberDto,) {
    return this.membersService.create(createMemberDto);
  }

  @MessagePattern('members.findAll')
  findAll(@Payload() userId: string) {
    return this.membersService.findAll(userId);
  }

  @MessagePattern('members.findOne')
  findOne(@Payload() data: { id: string, userId: string }) {
    const { id, userId } = data;
    return this.membersService.findOne(id, userId);
  }

  @MessagePattern('members.update')
  update(@Payload() data: { id: string, updateMemberDto: UpdateMemberDto }) {
    const { id, updateMemberDto } = data;
    return this.membersService.update(id, updateMemberDto);
  }

  @MessagePattern('members.remove')
  remove(@Payload() data: { id: string, userId: string }) {
    const { id, userId } = data;
    return this.membersService.remove(id, userId);
  }
}
