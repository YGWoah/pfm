import { PrismaClient, Role, Categorie } from '@prisma/client';
const faker = require('faker');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create 10 users with the role "AUTHOR"
    const users = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const user = await prisma.user.create({
          data: {
            nom: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            role: Role.AUTHOR,
          },
        });
        return user;
      })
    );

    // Create 1 user with the role "ADMIN"
    const admin = await prisma.user.create({
      data: {
        nom: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: Role.ADMIN,
      },
    });

    // Create 10 categories
    const categories = await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        const category = await prisma.categorie.create({
          data: {
            nom: faker.lorem.word(),
          },
        });
        return category;
      })
    );

    // Create 100 articles
    await Promise.all(
      Array.from({ length: 100 }).map(async () => {
        const randomUser = faker.random.arrayElement(users);
        const randomCategories = faker.random.arrayElements(
          categories,
          faker.random.number({ min: 1, max: 4 })
        );

        const article = await prisma.article.create({
          data: {
            titre: faker.lorem.sentence(),
            contenu: faker.lorem.paragraphs(),
            image: faker.image.imageUrl(),
            categorieId: randomCategories.map((c: Categorie) => c.id), // Explicitly define the type
            userId: randomUser.id,
          },
        });

        // Create 0 to 20 comments for each article
        const numComments = faker.random.number({ min: 0, max: 20 });
        await Promise.all(
          Array.from({ length: numComments }).map(async () => {
            await prisma.commentaire.create({
              data: {
                email: faker.internet.email(),
                contenu: faker.lorem.paragraph(),
                User: {
                  connect: { email: randomUser.email },
                },
                Article: {
                  connect: { id: article.id },
                },
              },
            });
          })
        );
      })
    );

    console.log('Seed data created successfully!');
  } catch (error) {
    console.error('Error creating seed data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
