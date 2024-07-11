import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from 'src/schemas/category.shema';
import { CreateCategoryDto } from './dto/create-categoty.dto';
import { UpdateCategoryDto } from './dto/update-category.dt';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(data);
  }

  async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
    return this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryRepository.delete(id);
  }
}
