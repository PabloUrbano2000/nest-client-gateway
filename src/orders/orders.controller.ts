import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    // PRODUCT_SERVICE
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    // @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send('findAllOrders', { ...orderPaginationDto }),
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      // return orderPaginationDto;
      return this.client.send('findAllOrders', {
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return this.client.send('changeOrderStatus', {
        id,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
