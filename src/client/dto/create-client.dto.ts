import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'CPF deve ser uma string.' })
  @Matches(/^[0-9]{11}$/, {
    message: 'CPF deve conter exatamente 11 dígitos numéricos.',
  })
  cpf: string;

  @IsString({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'E-mail deve ser válido.' })
  email: string;

  @IsString({ message: 'O número de telefone é obrigatório.' })
  phoneNumber: string;

  @IsOptional()
  @IsString({ message: 'Endereço deve ser uma string.' })
  address?: string;
}
