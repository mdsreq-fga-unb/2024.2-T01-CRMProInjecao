import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
} from "class-validator";

export class CreateTokenDTO {
  @IsOptional()
  @IsString()
  user?: string;

  @IsString()
  token: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Type(() => Date)
  expirationDate: Date;
}
