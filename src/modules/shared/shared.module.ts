import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { ScheduleModule } from '@nestjs/schedule';
// import { cyanBright, Format, green, magentaBright, red, yellow } from 'cli-color';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';

const services = [];

const providers = [...services];

@Global()
@Module({
    imports: [CqrsModule],
    providers,
    exports: [CqrsModule, ...services],
})
export class SharedModule { }