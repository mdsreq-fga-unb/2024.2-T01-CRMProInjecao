import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  brand: 'Test Brand',
  costPrice: 100,
  sellPrice: 150,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  categories: [
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
  ],
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
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

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        costPrice: 100,
        sellPrice: 150,
        categories: ['test', 'grapes'],
        brand: 'Test Brand',
        description: 'Test Description',
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockProduct);

      expect(await controller.create(createProductDto)).toBe(mockProduct);
    });
  });
});
