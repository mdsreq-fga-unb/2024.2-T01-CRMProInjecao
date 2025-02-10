import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceOrderTypeDto } from './create-service-order-type.dto';

export class UpdateServiceOrderTypeDto extends PartialType(CreateServiceOrderTypeDto) {} 