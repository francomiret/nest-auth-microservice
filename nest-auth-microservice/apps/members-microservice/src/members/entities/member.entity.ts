export class Member {
    id: string;
    name: string;
    email: string;
    startDate: Date;
    endDate?: Date;
    memberType: MemberType;
    memberStatus: MemberStatus;
    userId: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export enum MemberType {
    INDIVIDUAL = 'INDIVIDUAL',
    GROUP = 'GROUP',
}

export enum MemberStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}