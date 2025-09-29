// src/seed.ts
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { User } from './user/entities/user.entity';
import { Clients } from './user/entities/clients.entity';
import { Product } from './products/entities/product.entity';
import { Review } from './reviews/entities/review.entity';
import { Models } from './products/entities/models.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'geekoServerDB',
  password: 'Mj4$!2@#',
  database: 'nestDB',
  entities: [User, Clients, Product, Review, Models],
  synchronize: true, // ⚠️ true solo si querés que cree las tablas (¡cuidado en producción!)
});

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conexión a la base de datos establecida');
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
    return;
  }

  const userRepo = AppDataSource.getRepository(User);
  const clientRepo = AppDataSource.getRepository(Clients);
  const productRepo = AppDataSource.getRepository(Product);
  const reviewRepo = AppDataSource.getRepository(Review);
  const modelsRepo = AppDataSource.getRepository(Models);

  // Seed users
  try {
    for (let i = 0; i < 300; i++) {
      const fakeUser = userRepo.create({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
      await userRepo.save(fakeUser);
    }
    console.log('✅ Usuarios sembrados correctamente');
  } catch (err) {
    console.error('❌ Error al sembrar usuarios:', err);
  }

  // Seed clients
  try {
    for (let i = 0; i < 500; i++) {
      const fakeClient = clientRepo.create({
        name: faker.company.name(),
        email: faker.internet.email(), // coincide con la entidad
        phone: faker.phone.number(), // coincide con la entidad
        // no pases id
        // tampoco password, no existe en la entidad
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });

      await clientRepo.save(fakeClient);
    }
    console.log('✅ Clientes sembrados correctamente');
  } catch (err) {
    console.error('❌ Error al sembrar clientes:', err);
  }

  // Seed models
  const models = [];
  try {
    for (let i = 0; i < 10; i++) {
      const fakeModel = modelsRepo.create({
        model: faker.commerce.productAdjective(),
      });
      models.push(await modelsRepo.save(fakeModel));
    }
    console.log('✅ Modelos sembrados correctamente');
  } catch (err) {
    console.error('❌ Error al sembrar modelos:', err);
  }

  // Seed products
  const products = [];
  try {
    for (let i = 0; i < 30; i++) {
      const fakeProduct = productRepo.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        stock: faker.number.int({ min: 1, max: 100 }),
        tags: [faker.commerce.department(), faker.commerce.department()],
        models: [models[faker.number.int({ min: 0, max: models.length - 1 })]],
      });
      const savedProduct = await productRepo.save(fakeProduct);
      products.push(savedProduct); // Asegúrate de agregar el producto guardado al array
    }
    console.log('✅ Productos sembrados correctamente');
  } catch (err) {
    console.error('❌ Error al sembrar productos:', err);
  }

  // Seed reviews
  try {
    if (products.length === 0) {
      throw new Error('No hay productos disponibles para asociar reseñas.');
    }

    for (let i = 0; i < 100; i++) {
      const fakeReview = reviewRepo.create({
        userName: faker.person.firstName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        product: products[faker.number.int({ min: 0, max: products.length - 1 })],
      });
      await reviewRepo.save(fakeReview);
    }
    console.log('✅ Reseñas sembradas correctamente');
  } catch (err) {
    console.error('❌ Error al sembrar reseñas:', err);
  }

  try {
    await AppDataSource.destroy();
    console.log('✅ Conexión a la base de datos cerrada');
  } catch (err) {
    console.error('❌ Error al cerrar la conexión a la base de datos:', err);
  }
}

seed().catch((err) => {
  console.error('❌ Error inesperado durante el proceso de seed:', err);
});
