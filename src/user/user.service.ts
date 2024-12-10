import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({ ...createUserDto });
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

    const updatedUser = await this.usersRepository.save({
      ...actualUser,
      ...updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    return await this.usersRepository.softRemove(user);
  }
}
