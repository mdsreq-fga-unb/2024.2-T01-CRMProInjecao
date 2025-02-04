import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

const categoryEntities: Category[] = [
  {
    id: '1',
    name: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: '2',
    name: 'grapes',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

const productEntity: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  brand: 'Test Brand',
  costPrice: 100,
  sellPrice: 150,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  categories: categoryEntities,
};

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Test Description',
      brand: 'Test Brand',
      costPrice: 100,
      sellPrice: 150,
      categories: ['test', 'grapes'],
    };

    jest.spyOn(categoryRepository, 'find').mockResolvedValue(categoryEntities);
    jest.spyOn(productRepository, 'create').mockReturnValue(productEntity);
    jest.spyOn(productRepository, 'save').mockResolvedValue(productEntity);

    const result = await service.create(createProductDto);
    expect(result).toEqual(productEntity);
    expect(categoryRepository.find).toHaveBeenCalledWith({
      where: { id: In(createProductDto.categories) },
    });
    expect(productRepository.create).toHaveBeenCalledWith({
      ...createProductDto,
      categories: categoryEntities,
    });
    expect(productRepository.save).toHaveBeenCalledWith(productEntity);
  });

  it('should return all products', () => {
    const result = service.findAll();
    expect(result).toBe('This action returns all products');
  });

  it('should return a product by id', () => {
    const result = service.findOne(1);
    expect(result).toBe('This action returns a #1 product');
  });

  it('should update a product by id', () => {
    const updateProductDto = { name: 'Updated Product', price: 150 };
    const result = service.update(1, updateProductDto);
    expect(result).toBe('This action updates a #1 product');
  });

  it('should remove a product by id', () => {
    const result = service.remove(1);
    expect(result).toBe('This action removes a #1 product');
  });
});
