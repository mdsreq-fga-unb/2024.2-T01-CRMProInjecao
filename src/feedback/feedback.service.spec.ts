import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { ClientService } from '../client/client.service';
import { ServiceOrderService } from '../service-order/service-order.service';
import { NotFoundException } from '@nestjs/common';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let feedbackRepository: Repository<Feedback>;
  let clientService: ClientService;
  let serviceOrderService: ServiceOrderService;

  const mockFeedbackRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockClientService = {
    findOneByCPF: jest.fn(),
  };

  const mockServiceOrderService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: mockFeedbackRepository,
        },
        {
          provide: ClientService,
          useValue: mockClientService,
        },
        {
          provide: ServiceOrderService,
          useValue: mockServiceOrderService,
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    feedbackRepository = module.get<Repository<Feedback>>(getRepositoryToken(Feedback));
    clientService = module.get<ClientService>(ClientService);
    serviceOrderService = module.get<ServiceOrderService>(ServiceOrderService);
  });

  describe('create', () => {
    it('deve criar um feedback com sucesso', async () => {
      const createDto = {
        description: 'Ótimo serviço',
        rating: 5,
        clientCPF: '12345678900',
        serviceOrderIds: [1],
      };

      const mockClient = { cpf: '12345678900', name: 'Cliente Teste' };
      const mockServiceOrder = { id: 1, description: 'Ordem de Serviço Teste' };
      const mockFeedback = {
        id: 1,
        ...createDto,
        client: mockClient,
        serviceOrders: [mockServiceOrder],
      };

      mockClientService.findOneByCPF.mockResolvedValue(mockClient);
      mockServiceOrderService.findOne.mockResolvedValue(mockServiceOrder);
      mockFeedbackRepository.create.mockReturnValue(createDto);
      mockFeedbackRepository.save.mockResolvedValue(mockFeedback);

      const result = await service.create(createDto);

      expect(result.data).toBeDefined();
      expect(result.message).toBe('Feedback created successfully');
      expect(result.data.client).toEqual(mockClient);
      expect(result.data.serviceOrders).toHaveLength(1);
    });

    it('deve lançar NotFoundException quando o cliente não for encontrado', async () => {
      const createDto = {
        description: 'Teste',
        rating: 5,
        clientCPF: 'invalid-cpf',
        serviceOrderIds: [],
      };

      mockClientService.findOneByCPF.mockRejectedValue(new NotFoundException('Client not found'));

      await expect(service.create(createDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de feedbacks', async () => {
      const mockFeedbacks = [
        { id: 1, description: 'Feedback 1' },
        { id: 2, description: 'Feedback 2' },
      ];

      mockFeedbackRepository.find.mockResolvedValue(mockFeedbacks);

      const result = await service.findAll();

      expect(result).toEqual(mockFeedbacks);
      expect(mockFeedbackRepository.find).toHaveBeenCalledWith({
        relations: ['client', 'serviceOrders'],
      });
    });
  });

  describe('findOne', () => {
    it('deve retornar um feedback específico', async () => {
      const mockFeedback = {
        id: 1,
        description: 'Feedback Teste',
        rating: 5,
      };

      mockFeedbackRepository.findOne.mockResolvedValue(mockFeedback);

      const result = await service.findOne(1);

      expect(result).toEqual(mockFeedback);
    });

    it('deve lançar NotFoundException quando feedback não for encontrado', async () => {
      mockFeedbackRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar um feedback com sucesso', async () => {
      const updateDto = {
        description: 'Feedback atualizado',
        rating: 4,
      };

      const mockExistingFeedback = {
        id: 1,
        description: 'Feedback original',
        rating: 5,
      };

      const mockUpdatedFeedback = {
        ...mockExistingFeedback,
        ...updateDto,
      };

      mockFeedbackRepository.findOne.mockResolvedValue(mockExistingFeedback);
      mockFeedbackRepository.save.mockResolvedValue(mockUpdatedFeedback);

      const result = await service.update(1, updateDto);

      expect(result.data).toEqual(mockUpdatedFeedback);
      expect(result.message).toBe('Feedback updated successfully');
    });
  });

  describe('remove', () => {
    it('deve remover um feedback com sucesso', async () => {
      const mockFeedback = {
        id: 1,
        description: 'Feedback para remover',
      };

      mockFeedbackRepository.findOne.mockResolvedValue(mockFeedback);
      mockFeedbackRepository.remove.mockResolvedValue(mockFeedback);

      const result = await service.remove(1);

      expect(result.message).toBe('Feedback deleted successfully');
      expect(result.id).toBe(1);
    });
  });
});
