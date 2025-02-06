import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./entities/token.entity";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTokenDTO } from "./dto/create-token.dto";
import { UserService } from "../user/user.service";
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly TokenRepository: Repository<Token>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
  ) { }

  async findToken(token: string) {
    return await this.TokenRepository.findOne({
      where: { token },
      relations: ["user",],
      select: [
        "id",
        "expirationDate",
        "token",
        "user",
        "description",
      ],
    });
  }

  async createToken(payload = { date: Date.now() }): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async createSixDigitsTokenToCustomer() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async create(data: CreateTokenDTO) {
    if (data.user) {
      const userOfToken = await this.usersService.findOneById(data.user);
      if (!userOfToken) {
        throw new BadRequestException("Usuário não encontrado");
      }

      const createdToken = this.TokenRepository.create({
        ...data,
        user: userOfToken,
      });
      const tokenSaved = await this.TokenRepository.save(createdToken);
      return tokenSaved;
    }
  }

  async findAll() {
    return await this.TokenRepository.find();
  }

  async findOne(id: number) {
    return await this.TokenRepository.findOne({
      where: { id },
      relations: ["user",],
      select: ["id", "expirationDate", "token", "user",],
    });
  }

  async update(
    id: number,
    body: {
      token: string;
    },
  ) {
    const token = await this.TokenRepository.findOneBy({ id });

    if (!token) {
      throw new BadRequestException("Token não encontrado");
    }

    const updatedUser = Object.assign(token, body);
    return await this.TokenRepository.save(updatedUser);
  }

  async remove(id: number) {
    const token = this.TokenRepository.delete({ id });

    if (!token) {
      return { message: "Token não encontrado!" };
    }

    return { message: "Token Deletado" };
  }
}
