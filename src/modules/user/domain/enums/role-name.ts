import { registerEnumType } from '@nestjs/graphql';

export enum RoleName {
    admin = 'admin',
    member = 'member',
}

registerEnumType(RoleName, { name: 'RoleName' });