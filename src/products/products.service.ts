/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException,} from '@nestjs/common';
import { ProductPatchDto } from './dto/product-patch.dto/product-patch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto/product.dto';

//@Injectable()
//export class ProductsService {
//  private products: Product[] = [
//    {
//      id: 1,
//      name: 'Product 1',
//      description: 'Description 1',
//      price: 100,
//      tags: ['Disponible'],
//    },
//    {
//      id: 2,
//      name: 'Product 2',
//      description: 'Description 2',
//      price: 200, 
//      tags: ['Agotado'],
//    },
//  ];

@Injectable()
export class ProductsService {
  products: any[];
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  
  // Retorna todos los productos
  getAll(){
    return this.productsRepository.find();
  }

  // Retorna un producto basado en su ID
  //getId(id: number): Product {
  //  const product = this.products.find((item: Product) => item.id == id);
  //  if (product) {
  //    return product;
  //  } else {
  //    throw new NotFoundException(`No encontramos el producto ${id}`);
  //  }
  //}

  async getId(id: number): Promise<Product | null> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`No se encuentra el producto con ID ${id}`);
    }
    return product;
  }

  // Inserta un nuevo producto en la lista
 // insert(product: Product) {
 // this.products = [...this.products, product];
 // }

 async insert(product: ProductDto) {
  const newProduct = this.productsRepository.create(product);
  return this.productsRepository.save(newProduct);
 }

  // Actualiza un producto existente
 // update(id: number, body: any) {
 //   const product: Product = {
 //     id: id,
 //     name: body.name,
 //     description: body.description,
 //     price: body.price,
 //     stock: body.stock,
 //     tags: body.tags,
 //   };
 //   this.products = this.products.map((item: Product) => {
 //     return item.id == id ? product : item;
 //   }); 
 // }
  async update(id: number, body: any) {
    const upDateProduct = {
      id,
      ...body,
    }
    const product = await this.productsRepository.preload(upDateProduct);
    if (!product) {
      throw new NotFoundException(`No encontramos el producto ${id}`);
    }
  }

  async patch(id: number, body: ProductPatchDto) {
    const productToUpdate = {
      id,
      ...body,
    };
    const product = await this.productsRepository.preload(productToUpdate);
    if (!product) {
      throw new NotFoundException(`No se encuentra el producto con ID ${id}`);
    }
    return this.productsRepository.save(product);
  }
  

  // Elimina un producto de la lista
  async delete(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`No se encuentra el producto con ID ${id}`);
    }
    return this.productsRepository.remove(product);
  }
  

  // Filtra productos por etiqueta
  getProductByTag(tag: string): Product[] {
    // Convierte el tag recibido a minúsculas
    const lowerCaseTag = tag.toLowerCase();

    // Filtra los productos donde el tag coincida con el tag buscado (sin importar mayúsculas/minúsculas)
    const productsWithTag = this.products.filter((product) =>
      product.tags.some(
        (productTag) => productTag.toLowerCase() === lowerCaseTag,
      ),
    );

    // Si no se encontraron productos con ese tag, lanzar una excepción
    if (productsWithTag.length === 0) {
      throw new NotFoundException(
        `No se encontraron productos con la etiqueta ${tag}`,
      );
    }

    return productsWithTag;
  }

  // Retorna el último ID utilizado en la lista de productos
  private lastId() {
    return this.products[this.products.length - 1].id;
  }
}
