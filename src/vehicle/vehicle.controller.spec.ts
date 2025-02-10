import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleStatus } from './entities/vehicle.entity';

export const mockClient = {
  cpf: '00000000000',
  name: 'João Silva',
  email: 'test@example.com',
  phoneNumber: '(11) 98765-4321',
  address: 'Rua das Flores, 123 - São Paulo, SP',
  createdAt: new Date('2024-01-01T10:00:00'),
  updatedAt: new Date('2024-02-01T12:30:00'),
  vehicles: [],
  serviceOrders: [],
  budgets: [],
  feedbacks: [],
  deletedAt: null,
};

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const createVehicleDto: CreateVehicleDto = {
        licensePlate: 'ABC1234',
        model: 'Model X',
        brand: 'Brand Y',
        fabricationDate: new Date(),
        modelYear: 2022,
        color: 'Red',
        renavam: '123456789',
        fuelType: 'Gasoline',
        chassiNumber: '1HGBH41JXMN109186',
        currentMileage: 1000,
        descritpion: 'Description',
        status: VehicleStatus.AVAILABLE,
        clientCPF: '12345678901',
      };
      const result = {
        message: 'Vehicle created successfully',
        data: {
          clientCPF: '12345678901',
          licensePlate: 'ABC1234',
          brand: 'Brand Y',
          model: 'Model X',
          modelYear: 2022,
        },
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      const response = await controller.create(createVehicleDto);
      expect(response).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createVehicleDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = [
        {
          licensePlate: 'ABC1234',
          model: 'Model X',
          brand: 'Brand Y',
          fabricationDate: new Date(),
          modelYear: 2022,
          color: 'Red',
          renavam: '123456789',
          fuelType: 'Gasoline',
          chassiNumber: '1HGBH41JXMN109186',
          currentMileage: 1000,
          descritpion: 'Description',
          status: VehicleStatus.AVAILABLE,
          client: mockClient,
          serviceOrders: [],
          budgets: [],
          feedbacks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      const response = await controller.findAll();
      expect(response).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      const result = {
        licensePlate: 'ABC1234',
        model: 'Model X',
        brand: 'Brand Y',
        fabricationDate: new Date(),
        modelYear: 2022,
        color: 'Red',
        renavam: '123456789',
        fuelType: 'Gasoline',
        chassiNumber: '1HGBH41JXMN109186',
        currentMileage: 1000,
        descritpion: 'Description',
        status: VehicleStatus.AVAILABLE,
        client: mockClient,
        serviceOrders: [],
        budgets: [],
        feedbacks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      const response = await controller.findOne('1');
      expect(response).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicleDto: UpdateVehicleDto = { model: 'Model Z' };
      const result = {
        message: 'Vehicle updated successfully',
        updatedVehicle: {
          licensePlate: 'ABC1234',
          model: 'Model X',
          brand: 'Brand Y',
          fabricationDate: new Date(),
          modelYear: 2022,
          color: 'Red',
          renavam: '123456789',
          fuelType: 'Gasoline',
          chassiNumber: '1HGBH41JXMN109186',
          currentMileage: 1000,
          descritpion: 'Description',
          status: VehicleStatus.AVAILABLE,
          clientCPF: '12345678901',
          client: mockClient,
          serviceOrders: [],
          budgets: [],
          feedbacks: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      const response = await controller.update('1', updateVehicleDto);
      expect(response).toBe(result);
      expect(service.update).toHaveBeenCalledWith('1', updateVehicleDto);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      const result = {
        message: 'Vehicle removed successfully',
        licensePlate: 'ABC1234',
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      const response = await controller.remove('1');
      expect(response).toBe(result);
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
