import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ServiceOrderService } from './service-order.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { UpdateServiceOrderDto } from './dto/update-service-order.dto';
import { CreateServiceOrderTypeDto } from './dto/create-service-order-type.dto';
import { UpdateServiceOrderTypeDto } from './dto/update-service-order-type.dto';

@Controller('service-order')
export class ServiceOrderController {
  constructor(private readonly serviceOrderService: ServiceOrderService) {}

  @Post()
  create(@Body() createServiceOrderDto: CreateServiceOrderDto) {
    return this.serviceOrderService.create(createServiceOrderDto);
  }

  @Get()
  findAll() {
    return this.serviceOrderService.findAll();
  }

  @Get('type')
  findAllTypes() {
    return this.serviceOrderService.findAllTypes();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceOrderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceOrderDto: UpdateServiceOrderDto,
  ) {
    return this.serviceOrderService.update(id, updateServiceOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceOrderService.remove(id);
  }

  // Endpoints para ServiceOrderType
  @Post('type')
  createType(@Body() createServiceOrderTypeDto: CreateServiceOrderTypeDto) {
    return this.serviceOrderService.createType(createServiceOrderTypeDto);
  }

  @Get('type/:id')
  findOneType(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceOrderService.findOneType(id);
  }

  @Patch('type/:id')
  updateType(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceOrderTypeDto: UpdateServiceOrderTypeDto,
  ) {
    return this.serviceOrderService.updateType(id, updateServiceOrderTypeDto);
  }

  @Delete('type/:id')
  removeType(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceOrderService.removeType(id);
  }
}
