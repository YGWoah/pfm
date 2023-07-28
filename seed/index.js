const { PrismaClient, Role } = require('@prisma/client');
const faker = require('faker');

const bcrypt = require('bcrypt');

const saltRounds = 10; // Number of salt rounds for bcrypt

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    // Handle error
    console.log(error);
    throw new Error('Password hashing failed');
  }
}

const prisma = new PrismaClient();
const createUsers = async () => {
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      let password = await faker.internet.password();
      password = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          nom: faker.name.findName(),
          email: faker.internet.email(),
          password: password,
          role: Role.AUTHOR,
        },
      });
      return user;
    })
  );
  return users;
};

const createAdmin = async () => {
  const admin = await prisma.user.create({
    data: {
      nom: faker.name.findName(),
      email: faker.internet.email(),
      password: await hashPassword(faker.internet.password()),
      role: Role.ADMIN,
    },
  });
  return admin;
};

const createCategories = async () => {
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

  return categories;
};

const createArticles = async () => {
  const categories = await prisma.categorie.findMany({
    take: 10,
  });

  const users = await prisma.user.findMany({
    take: 10,
    skip: 0,
  });

  const articles = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const article = await prisma.article.create({
        data: {
          titre: faker.lorem.sentence(),
          contenu: faker.lorem.paragraphs(),
          image: faker.image.imageUrl(),
          categorieId:
            categories[parseInt((Math.random() * 10) % 10)].id,
          userId: users[parseInt((Math.random() * 10) % 10)].id,
        },
      });
    })
  );
};

try {
  createUsers();
  createAdmin();
  createCategories();
  createArticles();
} catch (error) {
  console.log(error);
}
