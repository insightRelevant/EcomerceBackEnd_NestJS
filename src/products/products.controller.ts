import {
  Body,
  Controller,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { ProductsService } from '../products/products.service'; // Importa el servicio de productos
import { Product } from './interfaces/product.interface'; // Importa la interfaz del producto
import { ProductDto } from './dto/product.dto/product.dto'; // Importa el DTO para productos
import { ProductPatchDto } from './dto/product-patch.dto/product-patch.dto'; // Importa el DTO para actualizar productos parcialmente
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

// Controlador para la ruta '/products'
@Controller('products')
export class ProductsController {
  reviewService: any;
  // Constructor que recibe una instancia de ProductsService
  constructor(private readonly productsService: ProductsService) {}

  // Método para manejar solicitudes GET en '/products'
  // Retorna todos los productos como un array de objetos de tipo Product
  @Get()
  async getAllProducPromises(): Promise<Product[] | null> {
    return await this.productsService.getAll(); // Llama al método 'getAll' del servicio de productos
  }

  // Maneja solicitudes GET en '/products/:id', donde ':id' es un parámetro de ruta
  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getId(id); // Llama al servicio con el ID proporcionado
  }

  // Maneja solicitudes GET en '/products/tag/:tag', donde ':tag' es un parámetro de ruta
  // Filtra productos por el valor de 'tag'
  @Get('tag/:tag')
  getProductByTag(@Param('tag') tag: string) {
    // Pasamos el tag recibido al servicio para obtener los productos sin importar mayúsculas/minúsculas
    return this.productsService.getProductByTag(tag.toLowerCase()); // Convertimos el tag a minúsculas
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // Establece el código de estado HTTP 201 (Creado) si la operación es exitosa
  createProduct(@Body() productDto: ProductDto) {
    const createdProduct = this.productsService.insert(productDto); // Llama al servicio para crear un producto

    return {
      message: 'Product created successfully', // Respuesta de éxito con el producto creado
      product: createdProduct,
    };
  }

  @Post(':id/review')
  async createReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateReviewDto,
  ) {
    return await this.reviewService.saveReview(id, body);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }), // Convierte 'id' a número o lanza error 406
    )
    id: number,
    @Body() body, // Recibe el cuerpo de la solicitud
  ) {
    return this.productsService.update(id, body); // Llama al servicio para actualizar el producto con el ID proporcionado
  }

  @Patch(':id')
  async patch(
    @Param('id', ParseIntPipe) id: number, // Convierte 'id' a un número y lanza un error si no es válido
    @Body() body: ProductPatchDto, // Recibe el cuerpo de la solicitud para actualizar parcialmente un producto
  ) {
    return this.productsService.patch(id, body); // Llama al servicio para realizar la actualización parcial
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Establece el código de estado HTTP 204 (Sin contenido) si la operación es exitosa
  async delete(@Param('id') id: number) {
    await this.productsService.delete(id); // Llama al servicio para eliminar el producto con el ID proporcionado
  }

  // @Post(':id/review')
  // async postReview(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() body: ReviewDto,
  // ) { await return this.review}
}
