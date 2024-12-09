import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: ORDER_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       host: envs.ordersMicroserviceHost,
    //       port: envs.ordersMicroservicePort,
    //     },
    //   },
    // ]),
    NatsModule,
  ],
})
export class OrdersModule {}
