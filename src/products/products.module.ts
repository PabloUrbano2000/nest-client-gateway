import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   {
    //     // name: PRODUCT_SERVICE,
    //     name: NATS_SERVICE,
    //     // transport: Transport.TCP,
    //     transport: Transport.NATS,
    //     options: {
    //       // host: envs.productsMicroserviceHost,
    //       // port: envs.productsMicroservicePort,
    //       servers: envs.natsServers,
    //     },
    //   },
    // ]),
    NatsModule,
  ],
})
export class ProductsModule {}
