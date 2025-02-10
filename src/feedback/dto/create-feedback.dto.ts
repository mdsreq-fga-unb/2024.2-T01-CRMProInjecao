import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

export class CreateFeedbackDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  clientCPF: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  serviceOrderIds?: number[];
}
