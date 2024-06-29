import { IsString, IsNotEmpty, IsNumber, IsOptional,   } from 'class-validator';


export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsOptional()
  imagenUrl: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}