import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { BudgetStatus } from '../entities/budget.entity';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
  @IsEnum(BudgetStatus)
  @IsOptional()
  status?: BudgetStatus;
}
