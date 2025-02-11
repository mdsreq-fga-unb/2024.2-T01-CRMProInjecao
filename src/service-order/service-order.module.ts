import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOrderService } from './service-order.service';
import { ServiceOrderController } from './service-order.controller';
import {
  ServiceOrder,
  ServiceOrderType,
} from './entities/service-order.entity';
import { Budget } from './entities/budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { ProductsModule } from '../products/products.module';
import { VehicleModule } from '../vehicle/vehicle.module';
import { ClientModule } from '../client/client.module';
import { ServiceHistory } from './entities/service-history.entity';
import { ServiceHistoryService } from './service-history.service';
import { ServiceHistoryController } from './service-history.controller';
import { ServiceStatsService } from './service-stats.service';
import { ServiceStatsController } from './service-stats.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceOrder,
      ServiceOrderType,
      Budget,
      ServiceHistory,
    ]),
    ProductsModule,
    ClientModule,
    VehicleModule,
    EmailModule,
  ],
  controllers: [
    ServiceOrderController,
    BudgetController,
    ServiceHistoryController,
    ServiceStatsController,
  ],
  providers: [
    ServiceOrderService,
    BudgetService,
    ServiceHistoryService,
    ServiceStatsService,
  ],
  exports: [ServiceOrderService, BudgetService],
})
export class ServiceOrderModule {}
