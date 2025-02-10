import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), forwardRef(() => UserModule)],
  providers: [TokenService],
  controllers: [],
  exports: [TokenService],
})
export class TokenModule {}
