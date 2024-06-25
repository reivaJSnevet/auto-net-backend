import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/schemas/product.shema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const product = this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
