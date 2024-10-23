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
} from "@nestjs/common"; // Importa las utilidades necesarias de NestJS

import { ProductsService } from "src/services/products/products.service"; // Importa el servicio de productos
import { Product } from "./interfaces/product.interface"; // Importa la interfaz del producto
import { ProductDto } from "src/products/dto/product.dto/product.dto"; // Importa el DTO para productos

// Controlador para la ruta '/products'
@Controller('products')
export class ProductsController {
  // Constructor que recibe una instancia de ProductsService
  constructor(private readonly productsService: ProductsService) {}

  // Método para manejar solicitudes GET en '/products'
  // Retorna todos los productos como un array de objetos de tipo Product
  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAll(); // Llama al método 'getAll' del servicio de productos
  }

  // Maneja solicitudes GET en '/products/:id', donde ':id' es un parámetro de ruta
  // El 'id' es convertido a número usando 'ParseIntPipe'
  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getId(id); // Llama al método 'getId' del servicio con el ID proporcionado
  }

  // Maneja solicitudes GET en '/products/tag/:tag', donde ':tag' es un parámetro de ruta
  // Filtra productos por el valor de 'tag'
  @Get('tag/:tag')
  getProductBytag(@Param('tag') tag: string) {
    return this.productsService.getProductByTag(tag); // Llama al método 'getProductByTag' del servicio con el 'tag' proporcionado
  }

  // Maneja solicitudes POST en '/products'
  // Crea un nuevo producto basado en los datos enviados en el cuerpo de la solicitud
  @Post()
  @HttpCode(HttpStatus.CREATED) // Establece el código de estado HTTP 201 (Creado) si la operación es exitosa
  createProduct(@Body() productDto: ProductDto) {
    const createdProduct = this.productsService.insert(productDto); // Llama al método 'insert' del servicio para crear un producto

    return {
      message: 'Product created successfully', // Respuesta de éxito con el producto creado
      product: createdProduct,
    };
  }

  // Maneja solicitudes PUT en '/products/:id', donde ':id' es un parámetro de ruta
  // Actualiza un producto basado en su ID y los datos enviados en el cuerpo
  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, 
    @Body() body,
  ) {
    return this.productsService.update(id, body); // Llama al método 'update' del servicio para actualizar el producto con el ID proporcionado
  }

  // Maneja solicitudes DELETE en '/products/:id', donde ':id' es un parámetro de ruta
  // Elimina un producto basado en su ID
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Establece el código de estado HTTP 204 (Sin contenido) si la operación es exitosa
  delete(@Param('id') id: number) {
    this.productsService.delete(id); // Llama al método 'delete' del servicio para eliminar el producto con el ID proporcionado
  }
}
