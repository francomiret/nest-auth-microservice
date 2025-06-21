import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller()
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @MessagePattern('members.create')
  create(@Payload() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @MessagePattern('members.findAll')
  findAll() {
    return this.membersService.findAll();
  }

  @MessagePattern('members.findOne')
  findOne(@Payload() id: number) {
    return this.membersService.findOne(id);
  }

  // @MessagePattern('updateMember')
  // update(@Payload() updateMemberDto: UpdateMemberDto) {
  //   return this.membersService.update(updateMemberDto.id, updateMemberDto);
  // }

  @MessagePattern('members.remove')
  remove(@Payload() id: number) {
    return this.membersService.remove(id);
  }
}
