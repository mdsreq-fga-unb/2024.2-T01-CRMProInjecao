import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';
import { ClientService } from '../client/client.service';
import { ServiceOrderService } from '../service-order/service-order.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly clientService: ClientService,
    private readonly serviceOrderService: ServiceOrderService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<{
    message: string;
    data: Feedback;
  }> {
    const feedback = this.feedbackRepository.create(createFeedbackDto);

    // Buscar e validar o cliente
    const client = await this.clientService.findOneByCPF(
      createFeedbackDto.clientCPF,
    );
    feedback.client = client;

    // Buscar e validar as ordens de serviço, se fornecidas
    if (createFeedbackDto.serviceOrderIds?.length) {
      const serviceOrders = await Promise.all(
        createFeedbackDto.serviceOrderIds.map((id) =>
          this.serviceOrderService.findOne(id.toString()),
        ),
      );
      feedback.serviceOrders = serviceOrders;
    }

    const savedFeedback = await this.feedbackRepository.save(feedback);

    return {
      message: 'Feedback created successfully',
      data: savedFeedback,
    };
  }

  async findAll() {
    return this.feedbackRepository.find({
      relations: ['client', 'serviceOrders'],
    });
  }

  async findOne(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: ['client', 'serviceOrders'],
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  async update(
    id: number,
    updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<{
    message: string;
    data: Feedback;
  }> {
    const feedback = await this.findOne(id);

    if (updateFeedbackDto.clientCPF) {
      const client = await this.clientService.findOneByCPF(
        updateFeedbackDto.clientCPF,
      );
      feedback.client = client;
    }

    if (updateFeedbackDto.serviceOrderIds) {
      const serviceOrders = await Promise.all(
        updateFeedbackDto.serviceOrderIds.map((id) =>
          this.serviceOrderService.findOne(id.toString()),
        ),
      );
      feedback.serviceOrders = serviceOrders;
    }

    // Atualizar campos simples
    if (updateFeedbackDto.description) {
      feedback.description = updateFeedbackDto.description;
    }
    if (updateFeedbackDto.rating) {
      feedback.rating = updateFeedbackDto.rating;
    }

    const updatedFeedback = await this.feedbackRepository.save(feedback);

    return {
      message: 'Feedback updated successfully',
      data: updatedFeedback,
    };
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    const feedback = await this.findOne(id);
    await this.feedbackRepository.remove(feedback);

    return {
      message: 'Feedback deleted successfully',
      id,
    };
  }

  async findByToken(token: string) {
    const decodedToken = this.decodeToken(token);

    if (!decodedToken) {
      throw new NotFoundException('Token inválido');
    }

    const { feedbackId, clientCPF } = decodedToken;

    // Buscar o feedback
    const feedback = await this.feedbackRepository.findOne({
      where: { id: feedbackId },
      relations: [
        'client',
        'serviceOrders',
        'serviceOrders.type',
        'serviceOrders.vehicle',
        'serviceOrders.client',
      ],
    });

    if (!feedback || feedback.client.cpf !== clientCPF) {
      throw new NotFoundException('Feedback não encontrado ou token inválido');
    }

    return {
      feedbackId: feedback.id,
      client: feedback.client,
      serviceOrder: feedback.serviceOrders,
    };
  }

  private decodeToken(token: string) {
    try {
      // Decodificar o token base64
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }
}
