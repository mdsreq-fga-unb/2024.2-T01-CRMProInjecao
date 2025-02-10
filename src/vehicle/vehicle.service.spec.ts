import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle, VehicleStatus } from './entities/vehicle.entity';
import { Client } from '../client/entities/client.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehicleService', () => {
  let service: VehicleService;
  let vehicleRepository: jest.Mocked<Repository<Vehicle>>;
  let clientRepository: jest.Mocked<Repository<Client>>;

  const mockVehicleRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
    })),
    merge: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockClientRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockClient: Client = {
    name: "nome",
    cpf: '00000000000',
    address: 'endereco',
    email: 'email',
    phoneNumber: 'phone',
    vehicles: [],
    serviceOrders: [],
    budgets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: mockVehicleRepository,
        },
        {
          provide: getRepositoryToken(Client),
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    vehicleRepository = module.get<jest.Mocked<Repository<Vehicle>>>(getRepositoryToken(Vehicle));
    clientRepository = module.get<jest.Mocked<Repository<Client>>>(getRepositoryToken(Client));

    // Mock the findOne method
    clientRepository.findOne = jest.fn().mockResolvedValue(mockClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const createVehicleDto = {
        licensePlate: 'ABC-1234',
        model: 'Model X',
        renavam: '123456789',
        status: VehicleStatus.AVAILABLE,
        brand: 'Brand Y',
        clientCPF: '00000000000',
        fabricationDate: new Date(),
        chassiNumber: '1HGBH41JXMN109186',
        color: 'Red',
        currentMileage: 1000,
        descritpion: 'Description',
        fuelType: 'Gasoline',
        modelYear: 2022,
      };

      const mockVehicle = {
        ...createVehicleDto,
        client: mockClient,
      };

      mockVehicleRepository.create.mockReturnValue(mockVehicle);
      mockVehicleRepository.save.mockResolvedValue(mockVehicle);

      await expect(service.create(createVehicleDto)).resolves.toEqual({
        message: 'Vehicle created successfully',
        data: {
          clientCPF: '00000000000',
          licensePlate: 'ABC-1234',
          brand: 'Brand Y',
          model: 'Model X',
          modelYear: 2022,
        },
      });

      expect(clientRepository.findOne).toHaveBeenCalledWith({ where: { cpf: '00000000000' } });
      expect(vehicleRepository.create).toHaveBeenCalledWith({
        licensePlate: 'ABC-1234',
        model: 'Model X',
        renavam: '123456789',
        status: VehicleStatus.AVAILABLE,
        brand: 'Brand Y',
        fabricationDate: expect.any(Date),
        chassiNumber: '1HGBH41JXMN109186',
        color: 'Red',
        currentMileage: 1000,
        descritpion: 'Description',
        fuelType: 'Gasoline',
        modelYear: 2022,
        client: mockClient,
      });
    });

    it('should throw NotFoundException if client does not exist', async () => {
      clientRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.create({
        clientCPF: '00000000000',
        licensePlate: 'XYZ-9999',
        brand: 'Ford',
        model: 'Focus',
        modelYear: 2021,
        chassiNumber: '123456789',
        color: 'White',
        currentMileage: 1000,
        descritpion: 'Description',
        fuelType: 'Gasoline',
        renavam: '123456789',
        status: VehicleStatus.AVAILABLE,
        fabricationDate: new Date(),
      })).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all vehicles', async () => {
      const vehicles = [{ licensePlate: 'ABC-1234', brand: 'Toyota', model: 'Corolla', modelYear: 2022 }];
      
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(vehicles),
      };
  
      // Certifique-se de que createQueryBuilder retorna o queryBuilder correto
      mockVehicleRepository.createQueryBuilder.mockReturnValue(queryBuilder);
  
      const result = await service.findAll();

  
      expect(result).toEqual(vehicles);
      expect(queryBuilder.getMany).toHaveBeenCalled();
    });
  
    it('should return vehicles filtered by client CPF', async () => {
      const vehicles: Vehicle[] = [
        {
          licensePlate: 'DEF-5678',
          brand: 'Honda',
          model: 'Civic',
          chassiNumber: '123456789',
          color: 'Blue',
          currentMileage: 5000,
          descritpion: 'Description',
          fuelType: 'Gasoline',
          renavam: '987654321',
          status: VehicleStatus.AVAILABLE,
          fabricationDate: new Date(),
          modelYear: 2023,
          client: mockClient,
          budgets: [],
          serviceOrders: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
  
      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(vehicles),
      };
  
      mockVehicleRepository.createQueryBuilder.mockReturnValue(queryBuilder);
  
      const result = await service.findAll('00000000000');
      
  
      expect(result).toEqual(vehicles);
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('vehicle.client', 'client');
      expect(queryBuilder.where).toHaveBeenCalledWith('client.cpf = :clientCPF', { clientCPF: '00000000000' });
    });
  });
  

  describe('findOne', () => {
    it('should return a vehicle by license plate', async () => {
      const vehicle = { licensePlate: 'ABC-1234', brand: 'Toyota', model: 'Corolla', modelYear: 2022 };
      mockVehicleRepository.findOne.mockResolvedValue(vehicle);

      await expect(service.findOne('ABC-1234')).resolves.toEqual(vehicle);
      expect(mockVehicleRepository.findOne).toHaveBeenCalledWith({
        where: { licensePlate: 'ABC-1234' },
        relations: ['client'],
      });
    });

    it('should throw NotFoundException if vehicle is not found', async () => {
      mockVehicleRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne('XYZ-9999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const existingVehicle = { licensePlate: 'ABC-1234', brand: 'Toyota', model: 'Corolla', modelYear: 2022 };
      const updateVehicleDto: UpdateVehicleDto = { brand: 'Honda' };
      const updatedVehicle = { ...existingVehicle, ...updateVehicleDto };

      mockVehicleRepository.findOne.mockResolvedValue(existingVehicle);
      mockVehicleRepository.merge.mockReturnValue(updatedVehicle);
      mockVehicleRepository.save.mockResolvedValue(updatedVehicle);

      await expect(service.update('ABC-1234', updateVehicleDto)).resolves.toEqual({
        message: 'Vehicle updated successfully',
        updatedVehicle,
      });

      expect(mockVehicleRepository.findOne).toHaveBeenCalledWith({ where: { licensePlate: 'ABC-1234' } });
      expect(mockVehicleRepository.merge).toHaveBeenCalledWith(existingVehicle, updateVehicleDto);
      expect(mockVehicleRepository.save).toHaveBeenCalledWith(updatedVehicle);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      mockVehicleRepository.softDelete.mockResolvedValue({ affected: 1 });

      await expect(service.remove('ABC-1234')).resolves.toEqual({
        message: 'Vehicle removed successfully',
        licensePlate: 'ABC-1234',
      });

      expect(mockVehicleRepository.softDelete).toHaveBeenCalledWith({ licensePlate: 'ABC-1234' });
    });
  });
});
