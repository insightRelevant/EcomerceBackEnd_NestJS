
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/controllers/products/interfaces/product.interface';
import { TagsController } from 'src/tags/tags.controller';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ProductsService {  //define an @Infectable class to import in products.controllers, and other components.
    private products: Product[] = [ // we set the -private- property to restring his acces from outside of [ProductService]
        {                              //*"product" is the name of the property that is declared to storage an array of objets of the type: "Product[]"
            id: 1,                      //"Product[]" tells the type of data that the prop "product" can handle.
            name: 'Product 1',              
           description: 'Description 1',
            price: 100,
            tags: ['DISPONIBLE', 'AGOTADO']
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 200,
            tags: ['Etiqueta 2', 'Etiqueta 3']
        }
    ];
    
    constructor(private readonly tagService: TagsService ) {} //we set a constructor method of the ProductsService as a param.
                                                                //this indicate that the service ProductsService depends of other services call "TagService" to handle come operations.

    /**
     * Returns all products.
    */
   getAll(): Product[]{
       return this.products;
       
    }

    /**
     * Returns a product based on its ID.
     * @param id The ID of the product.
    */
    getId(id: number): Product {
        const product = this.products.find( (item: Product) => item.id == id);
        if(product) {
          return product;
        } else {
          throw new NotFoundException(`No encontramos el producto ${id}`);
        }
      }
      
    
    insert(product: Product) { //push a new product in the list of products.
        this.products = [
            ...this.products,
            product
        ];
    }
    /**
     * Updates an existing product.
     * @param id The ID of the product to update.
     * @param body The updated details of the product.
    */
   update(id: number, body: any) {
       let product: Product = {
           id: id,
           name: body.name,
           description: body.description,
           price: body.price,
           tags: body.tags
        }
        this.products = this.products.map( (item : Product) => {
            console.log (item, id, item.id == id );
            return item.id == id? product : item;
        });
    }
    
    /**
     * Deletes a product.
     * @param id The ID of the product to delete.
     */
    delete(id: number) {
      const product = this.products.find((item: Product) => item.id == id);
      if(product) {
        this.products = this.products.filter( (item: Product) => item.id != id );
      } else {
        throw new HttpException(`No existe el producto ${id}`, HttpStatus.NOT_FOUND);
      }
    }

    getProductByTag(tag: string): Product[] {
      const productsWithTag: Product[] = [];
      const allTags = this.tagService.getAllTags(); // this code uses de tag services to get all tags available.
      
      for (const product of this.products) { //
          if (product.tags.includes(tag)) {
              productsWithTag.push(product);
          }
      }

      if (productsWithTag.length > 0) {
          return productsWithTag;
      } else {
          throw new NotFoundException(`No se encontraron productos con la etiqueta ${tag}`);
      }
  }



// esta función proporciona una forma de obtener el ID más alto en uso en la 
//lista de productos, lo que puede ser útil al insertar un 
//nuevo producto para asignarle un ID único. 
//Por ejemplo, si los ID de los productos son incrementales y 
//se asignan secuencialmente, esta función ayudaría a garantizar 
//que el nuevo producto tenga un ID único al asignarle el valor de lastId
    private lastId() {
        return this.products[this.products.length - 1].id;
    } 
}