import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = { name: 'Test Category' };
      const createdCategory = { id: '1', ...createCategoryDto };

      jest.spyOn(repository, 'create').mockReturnValue(createdCategory as any);
      jest.spyOn(repository, 'save').mockResolvedValue(createdCategory as any);

      expect(await service.create(createCategoryDto)).toEqual(createdCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [{ id: '1', name: 'Test Category' }];
      jest.spyOn(repository, 'find').mockResolvedValue(categories as any);

      expect(await service.findAll()).toEqual(categories);
    });
  });

  describe('findAllByIds', () => {
    it('should return an array of categories by ids', async () => {
      const ids = ['1'];
      const categories = [{ id: '1', name: 'Test Category' }];
      jest.spyOn(repository, 'find').mockResolvedValue(categories as any);

      expect(await service.findAllByIds(ids)).toEqual(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      const id = '1';
      const category = { id, name: 'Test Category' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(category as any);

      expect(await service.findOne(id)).toEqual(category);
    });

    it('should throw NotFoundException if category not found', async () => {
      const id = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = '1';
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      const category = { id, name: 'Test Category' };
      const updatedCategory = { ...category, ...updateCategoryDto };

      jest.spyOn(service, 'findOne').mockResolvedValue(category as any);
      jest.spyOn(repository, 'merge').mockReturnValue(updatedCategory as any);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedCategory as any);

      expect(await service.update(id, updateCategoryDto)).toEqual(
        updatedCategory,
      );
    });

    it('should throw NotFoundException if category not found', async () => {
      const id = '1';
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };

      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.update(id, updateCategoryDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should soft delete a category', async () => {
      const id = '1';
      const result = { affected: 1 };

      jest.spyOn(repository, 'softDelete').mockResolvedValue(result as any);

      expect(await service.remove(id)).toEqual({
        message: 'Category soft deleted successfully',
        id,
      });
    });

    it('should throw NotFoundException if category not found', async () => {
      const id = '1';
      const result = { affected: 0 };

      jest.spyOn(repository, 'softDelete').mockResolvedValue(result as any);

      await expect(service.remove(id)).rejects.toThrow(NotFoundException);
    });
  });
});
