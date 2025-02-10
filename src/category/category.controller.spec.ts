import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
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

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create a category', async () => {
      const dto: CreateCategoryDto = { name: 'Test Category' };
      const result: Category = {
        id: uuidv4(),
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [
        {
          id: uuidv4(),
          name: 'test',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const result: Category = {
        id: uuidv4(),
        name: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(result.id)).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith(result.id);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Category' };
      const result = {
        id: uuidv4(),
        name: dto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(result.id, dto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(result.id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const result = {
        message: 'Category soft deleted successfully',
        id: uuidv4(),
      };
      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(result.id)).toBe(result);
      expect(service.remove).toHaveBeenCalledWith(result.id);
    });
  });
});
