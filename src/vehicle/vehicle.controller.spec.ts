import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

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
        status: 'AVAILABLE',
        clientCPF: '12345678901',
      };
      const result = {
        message: 'Vehicle created successfully',
        data: createVehicleDto,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createVehicleDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = [{ licensePlate: 'ABC1234', model: 'Model X' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      const result = { licensePlate: 'ABC1234', model: 'Model X' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicleDto: UpdateVehicleDto = { model: 'Model Z' };
      const result = { licensePlate: 'ABC1234', model: 'Model Z' };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update('1', updateVehicleDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      const result = { message: 'Vehicle removed successfully' };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove('1')).toBe(result);
    });
  });
});
