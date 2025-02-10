import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { EmailModule } from '../email/email.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UserModule, EmailModule,TokenModule],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [AuthService], // Podera ser utilizado por outros modulos caso o usuario nao esteja logado
})
export class AuthModule { }
