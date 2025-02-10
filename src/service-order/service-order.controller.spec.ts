import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrderController } from './service-order.controller';
import { ServiceOrderService } from './service-order.service';
import { CreateServiceOrderDto } from './dto/create-service-order.dto';
import { CreateServiceOrderTypeDto } from './dto/create-service-order-type.dto';

describe('ServiceOrderController', () => {
  let controller: ServiceOrderController;
  let service: ServiceOrderService;

  const mockServiceOrderService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    createType: jest.fn(),
    findAllTypes: jest.fn(),
    findOneType: jest.fn(),
    updateType: jest.fn(),
    removeType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOrderController],
      providers: [
        {
          provide: ServiceOrderService,
          useValue: mockServiceOrderService,
        },
      ],
    }).compile();

    controller = module.get<ServiceOrderController>(ServiceOrderController);
    service = module.get<ServiceOrderService>(ServiceOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a service order', async () => {
      const createDto: CreateServiceOrderDto = {
        typeId: 'type-id',
        description: 'Test service order',
        clientCPF: '12345678900',
        vehicleLicensePlate: 'ABC1234',
        additionalCost: 100,
        productIds: ['product-id-1'],
      };

      const expectedResult = {
        id: 'service-order-id',
        ...createDto,
      };

      mockServiceOrderService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of service orders', async () => {
      const expectedResult = [
        { id: '1', description: 'Service Order 1' },
        { id: '2', description: 'Service Order 2' },
      ];

      mockServiceOrderService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('ServiceOrderType endpoints', () => {
    it('should create a service order type', async () => {
      const createTypeDto: CreateServiceOrderTypeDto = {
        name: 'Test Type',
        description: 'Test Description',
        price: 100,
      };

      const expectedResult = {
        id: 'type-id',
        ...createTypeDto,
      };

      mockServiceOrderService.createType.mockResolvedValue(expectedResult);

      const result = await controller.createType(createTypeDto);

      expect(result).toEqual(expectedResult);
      expect(service.createType).toHaveBeenCalledWith(createTypeDto);
    });

    it('should find all service order types', async () => {
      const expectedResult = [
        { id: '1', name: 'Type 1' },
        { id: '2', name: 'Type 2' },
      ];

      mockServiceOrderService.findAllTypes.mockResolvedValue(expectedResult);

      const result = await controller.findAllTypes();

      expect(result).toEqual(expectedResult);
      expect(service.findAllTypes).toHaveBeenCalled();
    });
  });
});
