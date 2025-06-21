import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/decorators/user.decorator';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createMemberDto: CreateMemberDto, @User() user: { id: string }) {
    return this.membersService.create(createMemberDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@User() user: { id: string }) {
    return this.membersService.findAll(user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: { id: string }) {
    return this.membersService.findOne(+id, user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto, @User() user: { id: string }) {
    return this.membersService.update(+id, updateMemberDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: { id: string }) {
    return this.membersService.remove(+id, user.id);
  }
}
