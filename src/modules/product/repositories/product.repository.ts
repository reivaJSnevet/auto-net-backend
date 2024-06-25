import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "src/schemas/product.shema";
import { CreateProductDto } from "../dto/create-product-dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductRepository {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product> {
        return this.productModel.findById(id).exec();
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate
        (id, updateProductDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Product> {
        return this.productModel.findByIdAndDelete(id).exec();
    }
}