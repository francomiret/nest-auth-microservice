import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;

    @IsString()
    @IsNotEmpty()
    memberType: string;

    @IsString()
    @IsNotEmpty()
    memberStatus: string;
}
