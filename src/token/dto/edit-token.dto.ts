import { IsString } from 'class-validator';

export class EditTokenDto {
  @IsString()
  token: string;
}
