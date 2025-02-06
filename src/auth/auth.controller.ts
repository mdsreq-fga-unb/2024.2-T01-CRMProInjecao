import { Body, Controller, Post, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { SignInDto } from './dto/signin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  async userSignUp(
    @Body() createUserBody: CreateUserDto,
  ): Promise<Partial<User>> {
    return await this.authService.register(createUserBody);
  }

  @Public()
  @Post('login')
  async userSingIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Post('validate-token')
  async validateToken(
    @Body() token: { token: string },
  ): Promise<{ user: Partial<User>; access_token: string }> {
    return await this.authService.validateToken(token.token);
  }

  @Public()
  @Post("reset-password")
  resetPassword(
    @Body() body: { token: string; password: string; confirmPassword: string },
  ) {
    return this.authService.resetPassword(
      body.token,
      body.password,
      body.confirmPassword,
    );
  }

  @Public()
  @Post("forgot-password")
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }
}
