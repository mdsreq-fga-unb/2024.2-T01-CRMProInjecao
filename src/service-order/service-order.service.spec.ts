import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOrderService } from './service-order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ServiceOrder,
  ServiceOrderType,
} from './entities/service-order.entity';
import { Budget } from './entities/budget.entity';
import { ProductsService } from '../products/products.service';
import { VehicleService } from '../vehicle/vehicle.service';
import { ClientService } from '../client/client.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ServiceOrderService', () => {
  let service: ServiceOrderService;
  let serviceOrderRepository: Repository<ServiceOrder>;
  let serviceOrderTypeRepository: Repository<ServiceOrderType>;
  let budgetRepository: Repository<Budget>;

  const mockProductsService = {
    findOne: jest.fn(),
  };

  const mockVehicleService = {
    findOne: jest.fn(),
  };

  const mockClientService = {
    findOneByCPF: jest.fn(),
  };

  const mockServiceOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockServiceOrderTypeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  const mockBudgetRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceOrderService,
        {
          provide: getRepositoryToken(ServiceOrder),
          useValue: mockServiceOrderRepository,
        },
        {
          provide: getRepositoryToken(ServiceOrderType),
          useValue: mockServiceOrderTypeRepository,
        },
        {
          provide: getRepositoryToken(Budget),
          useValue: mockBudgetRepository,
        },
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
        {
          provide: ClientService,
          useValue: mockClientService,
        },
      ],
    }).compile();

    service = module.get<ServiceOrderService>(ServiceOrderService);
    serviceOrderRepository = module.get<Repository<ServiceOrder>>(
      getRepositoryToken(ServiceOrder),
    );
    serviceOrderTypeRepository = module.get<Repository<ServiceOrderType>>(
      getRepositoryToken(ServiceOrderType),
    );
    budgetRepository = module.get<Repository<Budget>>(
      getRepositoryToken(Budget),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a service order successfully', async () => {
      const createDto = {
        typeId: 'type-id',
        description: 'Test service order',
        clientCPF: '12345678900',
        vehicleLicensePlate: 'ABC1234',
        additionalCost: 100,
        productIds: ['product-id-1'],
      };

      const mockType = { id: 'type-id', name: 'Test Type' };
      const mockClient = { cpf: '12345678900', name: 'Test Client' };
      const mockVehicle = { licensePlate: 'ABC1234', model: 'Test Car' };
      const mockProduct = { id: 'product-id-1', name: 'Test Product' };

      mockServiceOrderTypeRepository.findOneBy.mockResolvedValue(mockType);
      mockClientService.findOneByCPF.mockResolvedValue(mockClient);
      mockVehicleService.findOne.mockResolvedValue(mockVehicle);
      mockProductsService.findOne.mockResolvedValue(mockProduct);
      mockServiceOrderRepository.create.mockReturnValue({ ...createDto });
      mockServiceOrderRepository.save.mockResolvedValue({
        id: 'service-order-id',
        ...createDto,
        type: mockType,
        client: mockClient,
        vehicle: mockVehicle,
        products: [mockProduct],
      });

      const result = await service.create(createDto);

      expect(result).toBeDefined();
      expect(result.id).toBe('service-order-id');
      expect(mockServiceOrderRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException when type is not found', async () => {
      const createDto = {
        typeId: 'invalid-type-id',
        description: 'Test service order',
        clientCPF: '12345678900',
        vehicleLicensePlate: 'ABC1234',
      };

      mockServiceOrderTypeRepository.findOneBy.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of service orders', async () => {
      const mockServiceOrders = [
        { id: '1', description: 'Service Order 1' },
        { id: '2', description: 'Service Order 2' },
      ];

      mockServiceOrderRepository.find.mockResolvedValue(mockServiceOrders);

      const result = await service.findAll();

      expect(result).toEqual(mockServiceOrders);
      expect(mockServiceOrderRepository.find).toHaveBeenCalledWith({
        relations: ['type', 'client', 'vehicle', 'products'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a service order by id', async () => {
      const mockServiceOrder = {
        id: 'test-id',
        description: 'Test Service Order',
      };

      mockServiceOrderRepository.findOne.mockResolvedValue(mockServiceOrder);

      const result = await service.findOne('test-id');

      expect(result).toEqual(mockServiceOrder);
    });

    it('should throw NotFoundException when service order is not found', async () => {
      mockServiceOrderRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
