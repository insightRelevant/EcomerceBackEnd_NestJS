// src/seed.ts
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from './user/entities/user.entity';
import { Clients } from './user/entities/clients.entity';
import { Product } from './products/entities/product.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'geekoServerDB',
  password: 'Mj4$!2@#',
  database: 'nestDB',
  entities: [User, Clients, Product], // Ensure Clients entity has correct properties
  synchronize: false, // ⚠️ true solo si querés que cree las tablas (¡cuidado en producción!)
});

async function seed() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);
  const productRepo = AppDataSource.getRepository(Product);

  // Seed users
  for (let i = 0; i < 20000; i++) {
    const fakeUser = userRepo.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    await userRepo.save(fakeUser);
  }

  console.log('✅ Usuarios sembrados correctamente');

  // Simulate patches on products
  const products = await productRepo.find();
  for (const product of products) {
    product.name = faker.commerce.productName();
    product.price = parseFloat(faker.commerce.price());
    product.description = faker.commerce.productDescription();

    await productRepo.save(product);
  }

  console.log('✅ Productos actualizados correctamente');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error sembrando la base de datos:', err);
});
