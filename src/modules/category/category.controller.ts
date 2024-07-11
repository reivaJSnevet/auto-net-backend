import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/schemas/category.shema';
import { CreateCategoryDto } from './dto/create-categoty.dto';
import { UpdateCategoryDto } from './dto/update-category.dt';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    const category = this.categoryService.getCategoryById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  @Post()
  async createCategory(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
