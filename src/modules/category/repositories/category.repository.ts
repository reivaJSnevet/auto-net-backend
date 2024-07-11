import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/schemas/category.shema";
import { CreateCategoryDto } from "../dto/create-categoty.dto";
import { UpdateCategoryDto } from "../dto/update-category.dt";

@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findById(id: string): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoryModel.findByIdAndUpdate
        (id, updateCategoryDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Category> {
        return this.categoryModel.findByIdAndDelete(id).exec();
    }
}