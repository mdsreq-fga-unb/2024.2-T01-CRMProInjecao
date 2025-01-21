import { PickType } from '@nestjs/mapped-types';
import { Client } from '../entities/client.entity';

export class UpdateClientDto extends PickType(Client, [
  'name',
  'email',
  'phoneNumber',
  'address',
]) {}
