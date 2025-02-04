import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) { }

  async handleSendEmailOnCreateOrUpdate(user: {
    name: string;
    email: string;
    password: string;
  }, context: 'create' | 'update') {
    try {
      await this.emailService.sendEmail({
        context: {
          title: context === 'create' ? 'Bem vindo a plataforma CRM PRO INJEÇÃO' : 'Atualização de sua conta na plataforma CRM PRO INJEÇÃO',
          message: context === 'create' ? `Olá ${user.name}, o seu email de acesso a plataforma é: ${user.email} e a senha é: ${user.password}` : `Olá ${user.name}, ocorreram alterações em sua conta na plataforma CRM PRO INJEÇÃO, se não tiver sido você, altere sua senha, ou entre em contato com a equipe CRM PRO INJEÇÃO.`,
        },
        sendTo: user.email,
        subject: context === 'create' ? 'Bem vindo a plataforma CRM PRO INJEÇÃO' : 'Atualização de sua conta na plataforma CRM PRO INJEÇÃO',
        template: 'simpleEmail',
      });

    } catch (error) {
      console.log(error);

    }
  }

  async create(createUserDto: CreateUserDto) {
    let user = this.usersRepository.create(createUserDto);
    if (createUserDto.password) {
      await this.handleSendEmailOnCreateOrUpdate({
        name: user.name,
        email: user.email,
        password: createUserDto.password
      }, 'create');
    } else {
      const password = (() => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      })();
      user.password = password;
      await this.handleSendEmailOnCreateOrUpdate({
        name: user.name,
        email: user.email,
        password
      }, 'create');
    }

    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
      withDeleted: false,
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User> | null> {
    const actualUser = await this.usersRepository.findOne({
      where: { id: id },
    });

    if (!actualUser) {
      return null;
    }

    const updatedUser = Object.assign(actualUser, updateUserDto);

    await this.usersRepository.update(
      {
        id: id,
      },
      updatedUser,
    );

    const completeUser = await this.findOneById(id);

    return completeUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    return await this.usersRepository.softRemove(user);
  }
}
