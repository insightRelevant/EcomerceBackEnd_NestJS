// Interfaz que define la estructura de un producto
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  tags: string[];
}
