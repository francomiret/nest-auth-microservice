import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { MemberStatus, MemberType } from "../entities/member.entity";

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate?: Date;

    @IsEnum(MemberType)
    @IsNotEmpty()
    memberType: MemberType;

    @IsEnum(MemberStatus)
    @IsNotEmpty()
    memberStatus: MemberStatus;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @IsString()
    @IsNotEmpty()
    userId: string;
}
