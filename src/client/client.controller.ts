import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SearchClientDto } from './dto/search-client.dto';

@Controller('client')
@UseGuards(AuthGuard)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  async findAllWithFilters(@Query() searchClientDto: SearchClientDto) {
    return await this.clientService.findAllWithFilters(searchClientDto);
  }

  @Get(':cpf')
  async findOne(@Param('cpf') cpf: string) {
    return await this.clientService.findOneByCPF(cpf);
  }

  @Patch(':cpf')
  async update(
    @Param('cpf') cpf: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(cpf, updateClientDto);
  }

  @Delete(':cpf')
  async remove(@Param('cpf') cpf: string) {
    return await this.clientService.remove(cpf);
  }
}
