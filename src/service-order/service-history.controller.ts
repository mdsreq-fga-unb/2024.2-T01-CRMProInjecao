import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ServiceHistoryService } from './service-history.service';

@Controller('service-history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) {}

  @Get('budget/:id')
  findByBudget(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceHistoryService.findByBudget(id);
  }

  @Get('service-order/:id')
  findByServiceOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.serviceHistoryService.findByServiceOrder(id);
  }
}
