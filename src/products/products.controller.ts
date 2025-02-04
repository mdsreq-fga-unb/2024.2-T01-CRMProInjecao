import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

/**
 * Controller for handling product-related requests.
 */
@Controller('products')
export class ProductsController {
  /**
   * Constructs a new ProductsController.
   * @param productsService - The service used to manage products.
   */
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Creates a new product.
   * @param createProductDto - The data transfer object containing the product details.
   * @returns The created product.
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   * Retrieves all products.
   * @returns An array of all products.
   */
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * Retrieves a single product by its ID.
   * @param id - The ID of the product to retrieve.
   * @returns The product with the specified ID.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data transfer object containing the updated product details.
   * @returns The updated product.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  /**
   * Removes a product by its ID.
   * @param id - The ID of the product to remove.
   * @returns The result of the removal operation.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
