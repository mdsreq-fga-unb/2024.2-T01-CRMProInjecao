import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CategoryService } from '../category/category.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: CategoryService,
          useValue: {
            findAllByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        costPrice: 100,
        sellPrice: 150,
        categories: ['1', '2'],
      };
      const categories = [
        {
          id: '1',
          name: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },

        {
          id: '2',
          name: 'Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const savedProduct = { id: '1', ...createProductDto, categories };

      jest.spyOn(categoryService, 'findAllByIds').mockResolvedValue(categories);
      jest
        .spyOn(productRepository, 'create')
        .mockReturnValue(savedProduct as any);
      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValue(savedProduct as any);

      const result = await service.create(createProductDto);
      expect(result).toEqual(savedProduct);
      expect(categoryService.findAllByIds).toHaveBeenCalledWith(
        createProductDto.categories,
      );
      expect(productRepository.create).toHaveBeenCalledWith({
        ...createProductDto,
        categories,
      });
      expect(productRepository.save).toHaveBeenCalledWith(savedProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        { id: '1', name: 'Test Product', price: 100, categories: [] },
      ];
      jest.spyOn(productRepository, 'find').mockResolvedValue(products as any);

      const result = await service.findAll();
      expect(result).toEqual(products);
      expect(productRepository.find).toHaveBeenCalledWith({
        relations: ['categories'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const product = {
        id: '1',
        name: 'Test Product',
        price: 100,
        categories: [],
      };
      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValue(product as any);

      const result = await service.findOne('1');
      expect(result).toEqual(product);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['categories'],
      });
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        costPrice: 150,
        categories: ['1', '2'],
      };
      const categories = [
        {
          id: '1',
          name: 'Category 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },

        {
          id: '2',
          name: 'Category 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      const existingProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        categories: [],
      };
      const updatedProduct = {
        ...existingProduct,
        ...updateProductDto,
        categories,
      };

      jest
        .spyOn(productRepository, 'findOne')
        .mockResolvedValue(existingProduct as any);
      jest.spyOn(categoryService, 'findAllByIds').mockResolvedValue(categories);
      jest
        .spyOn(productRepository, 'save')
        .mockResolvedValue(updatedProduct as any);

      const result = await service.update('1', updateProductDto);
      expect(result).toEqual(updatedProduct);
      expect(productRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
        relations: ['categories'],
      });
      expect(categoryService.findAllByIds).toHaveBeenCalledWith(
        updateProductDto.categories,
      );
      expect(productRepository.save).toHaveBeenCalledWith(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      jest.spyOn(productRepository, 'delete').mockResolvedValue({} as any);

      await service.remove('1');
      expect(productRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
