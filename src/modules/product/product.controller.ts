import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  ConflictException,
  HttpCode,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/schemas/product.shema';
import { isValidObjectId } from 'mongoose';



 
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('No se encontro el producto con el ID ${id}');
    }
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  @Post()

  //upgrade
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    try {
      return this.productService.createProduct(data);
    } catch (error) {
      throw new BadRequestException("Error al crear el producto", error);
  }
}

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('No se encontro el producto con el ID ${id}');
    }
    const product = await this.productService.updateProduct(id, data);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
   const product = await this.productService.deleteProduct(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
  }
}
