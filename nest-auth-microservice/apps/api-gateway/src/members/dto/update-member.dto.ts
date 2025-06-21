import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}
