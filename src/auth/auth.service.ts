import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('User credentials are invalid');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      user: { id: user.id, email: user.email },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(email: string, password: string): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (await this.userService.findOneByEmail(email)) {
      throw new ForbiddenException('Email already under use');
    }
    const userCreated = await this.userService.create({
      email,
      password: hashedPassword,
    });

    return {
      id: userCreated.id,
      email: userCreated.email,
    };
  }

  async validateToken(
    token: string,
  ): Promise<{ user: Partial<User>; access_token: string }> {
    const payload = await this.jwtService.verifyAsync(token, {});
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      access_token: token,
    };
  }
}
