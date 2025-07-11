import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum MemberType {
    INDIVIDUAL = 'INDIVIDUAL',
    GROUP = 'GROUP',
}

enum MemberStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsOptional()
    @IsDate()
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
}
