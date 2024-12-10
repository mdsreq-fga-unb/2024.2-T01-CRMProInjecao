import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(User) {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  /**
   * Password must contain at least one letter, at least one number, and be longer than eight characters.
   */
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'password too weak',
  })
  password?: string;
}
