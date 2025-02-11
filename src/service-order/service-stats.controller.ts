import { Controller, Get } from '@nestjs/common';
import { ServiceStatsService } from './service-stats.service';

type RecentServiceResponse = {
  id: string;
  type: 'budget' | 'service_order';
  title: string;
  status: string;
};

@Controller('service-stats')
export class ServiceStatsController {
  constructor(private readonly serviceStatsService: ServiceStatsService) {}

  @Get()
  async getStats() {
    return this.serviceStatsService.getStats();
  }

  @Get('recent')
  async getRecentServices(): Promise<RecentServiceResponse[]> {
    return this.serviceStatsService.getRecentServices();
  }
}
