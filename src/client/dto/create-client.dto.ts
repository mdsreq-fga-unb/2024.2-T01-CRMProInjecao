import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @Matches(/^[0-9]{11}$/)
  cpf: string;
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address?: string;
}
