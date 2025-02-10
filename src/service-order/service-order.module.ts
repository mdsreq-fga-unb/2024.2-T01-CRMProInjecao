import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrder, ServiceOrderType } from './entities/service-order.entity';
import { Budget } from './entities/budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { ProductsModule } from '../products/products.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceOrder, ServiceOrderType, Budget]),
    ProductsModule,
    ClientModule,
    VehicleModule,
  ],
  controllers: [ServiceOrderController, BudgetController],
  providers: [ServiceOrderService, BudgetService],
  exports: [ServiceOrderService, BudgetService],
})
export class ServiceOrderModule {}
