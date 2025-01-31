import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Service dealing with product-related operations.
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Creates a new product.
   *
   * @param createProductDto - Data Transfer Object containing the details of the product to be created.
   * @returns The created product.
   */
  async create(createProductDto: CreateProductDto) {
    const { categories, ...productData } = createProductDto;
    const categoriesEntities = await this.categoryRepository.find({
      where: { id: In(categories) },
    });
    const product = this.productRepository.create({
      ...productData,
      categories: categoriesEntities,
    });

    return await this.productRepository.save(product);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
