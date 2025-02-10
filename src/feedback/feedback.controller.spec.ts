import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  const mockFeedbackService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: mockFeedbackService,
        },
      ],
    }).compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  describe('create', () => {
    it('deve criar um novo feedback', async () => {
      const createDto: CreateFeedbackDto = {
        description: 'Feedback teste',
        rating: 5,
        clientCPF: '12345678900',
        serviceOrderIds: [1],
      };

      const expectedResult = {
        message: 'Feedback created successfully',
        data: {
          id: 1,
          ...createDto,
        },
      };

      mockFeedbackService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de feedbacks', async () => {
      const expectedResult = [
        { id: 1, description: 'Feedback 1' },
        { id: 2, description: 'Feedback 2' },
      ];

      mockFeedbackService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um feedback específico', async () => {
      const expectedResult = {
        id: 1,
        description: 'Feedback teste',
        rating: 5,
      };

      mockFeedbackService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('deve atualizar um feedback', async () => {
      const updateDto: UpdateFeedbackDto = {
        description: 'Feedback atualizado',
        rating: 4,
      };

      const expectedResult = {
        message: 'Feedback updated successfully',
        data: {
          id: 1,
          ...updateDto,
        },
      };

      mockFeedbackService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('deve remover um feedback', async () => {
      const expectedResult = {
        message: 'Feedback deleted successfully',
        id: 1,
      };

      mockFeedbackService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
