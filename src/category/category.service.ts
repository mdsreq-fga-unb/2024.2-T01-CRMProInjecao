import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = this.categoryRepository.create({
      ...createCategoryDto,
    });
    return await this.categoryRepository.save(createdCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findAllByIds(ids: string[]) {
    return await this.categoryRepository.find({ where: { id: In(ids) } });
  }

  async findOne(id: string): Promise<Category> {
    const categoryFounded = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (categoryFounded) {
      return categoryFounded;
    } else {
      throw new NotFoundException('Category not found.');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category: Category | null | undefined = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );
    await this.categoryRepository.save(updatedCategory);
    return updatedCategory;
  }

  async remove(id: string) {
    const result = await this.categoryRepository.softDelete({ id: id });
    if (result.affected === 0) {
      throw new NotFoundException('Category not found.');
    }

    return {
      message: 'Category soft deleted successfully',
      id,
    };
  }
}
