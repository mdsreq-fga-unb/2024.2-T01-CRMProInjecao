import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { Feedback } from './entities/feedback.entity';
import { ClientModule } from '../client/client.module';
import { ServiceOrderModule } from '../service-order/service-order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    ClientModule,
    ServiceOrderModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
