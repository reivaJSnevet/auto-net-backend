import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {
    @Prop({ required: true, unique: true, trim: true })
    name: string;

    @Prop({ default: "Sin descripcion", trim: true})
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    imagenUrl: string;

    @Prop({ required: true})
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);