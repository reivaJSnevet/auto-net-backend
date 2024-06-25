import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { Product } from "src/schemas/product.shema";
import { CreateProductDto } from "./dto/create-product-dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<Product> {
        return this.productRepository.findById(id);
    }

    async createProduct(data: CreateProductDto): Promise<Product> {
        return this.productRepository.create(data);
    }

    async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
        return this.productRepository.update(id, data);
    }

    async deleteProduct(id: string): Promise<Product> {
        return this.productRepository.delete(id);
    }
}