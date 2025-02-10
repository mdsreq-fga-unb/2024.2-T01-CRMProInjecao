import * as dayjs from 'dayjs';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  async resetPassword(
    token: string,
    password: string,
    confirmPassword: string,
  ) {
    const tokenFound = await this.tokenService.findToken(token);
    if (!tokenFound) {
      throw new BadRequestException(
        'Token inválido, verifique se colocou o token certo',
      );
    }

    const expirationDate = dayjs(tokenFound.expirationDate).format();
    const now = dayjs().format();

    if (now.toString() > expirationDate.toString()) {
      await this.tokenService.remove(tokenFound.id);
      throw new BadRequestException(
        'Token expirado, verifique se colocou o token certo',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas precisam ser iguais');
    }

    if (!tokenFound.user) {
      throw new BadRequestException(
        'Usuário associado ao token não encontrado',
      );
    }

    const user = await this.userService.findOneById(tokenFound.user.id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    await this.emailService.sendEmail({
      sendTo: user.email,
      subject: 'Senha alterada',
      template: 'simpleEmail',
      context: {
        title: 'Sua senha foi alterada com sucesso',
        message: 'Se você não alterou sua senha, entre em contato conosco!',
      },
    });

    if (!tokenFound.user) {
      throw new BadRequestException(
        'Usuário associado ao token não encontrado',
      );
    }
    await this.userService.update(tokenFound.user.id, {
      password,
    });
    await this.tokenService.remove(tokenFound.id);

    return { message: 'Senha alterada com sucesso' };
  }

  async forgotPassword(userEmail: string) {
    const user = await this.userService.findOneByEmail(userEmail);
    if (!user) {
      return { message: 'Verifique a caixa de entradas do seu email' };
    }

    const token = await this.tokenService.createToken();

    await this.tokenService.create({
      user: user.id,
      token,
      expirationDate: dayjs().add(15, 'minutes').toDate(),
    });
    const baseLink = process.env.ADMIN_FRONTEND_URL || 'http://localhost:3000';

    const linkToAcess = `${baseLink}/auth/new-password/${token}`;

    const { send, error } = await this.emailService.sendEmail({
      sendTo: userEmail,
      subject: 'Recuperação de senha',
      template: 'simpleEmail',
      context: {
        title: 'Recuperação de senha',
        message: `Olá, ${user.name ?? 'Usuário'}, clique no link abaixo para recuperar a senha: ${linkToAcess}`,
      },
    });

    if (!send) {
      console.log(error);
      throw new BadRequestException(
        'Erro ao enviar email de recuperação de senha',
      );
    }

    return { message: 'Verifique a caixa de entradas do seu email' };
  }

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

  async register(createUserDto: CreateUserDto): Promise<Partial<User>> {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      throw new ForbiddenException('Email already under use');
    }
    const userCreated = await this.userService.create(createUserDto);

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
