import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnectionOptions } from './postgres-connection-options';
import { UsersRepository } from '@modules/user/repositories/users.repository';

const services = [];

const providers = [...services];

const repositories = [UsersRepository]

@Module({
    imports: [TypeOrmModule.forRoot(postgresConnectionOptions), TypeOrmModule.forFeature(repositories)],
    providers,
    exports: [...services],
})
export class DatabaseModule { }