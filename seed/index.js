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

// const createArticles = async (users, categories) => {
//   await Promise.all(
//     Array.from({ length: 100 }).map(async () => {
//       const randomUser = faker.random.arrayElement(users);
//       const randomCategories = faker.random.arrayElements(
//         categories,
//         faker.random.number({ min: 1, max: 4 })
//       );

// async function seed() {
//   try {
//     // Create 10 users with the role "AUTHOR"
//     const users = await Promise.all(
//       Array.from({ length: 10 }).map(async () => {
//         const user = await prisma.user.create({
//           data: {
//             nom: faker.name.findName(),
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//             role: Role.AUTHOR,
//           },
//         });
//         return user;
//       })
//     );

//     // Create 1 user with the role "ADMIN"
//     const admin = await prisma.user.create({
//       data: {
//         nom: faker.name.findName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//         role: Role.ADMIN,
//       },
//     });

//     // Create 10 categories
//     const categories = await Promise.all(
//       Array.from({ length: 10 }).map(async () => {
//         const category = await prisma.categorie.create({
//           data: {
//             nom: faker.lorem.word(),
//           },
//         });
//         return category;
//       })
//     );

//     // Create 100 articles
//     await Promise.all(
//       Array.from({ length: 100 }).map(async () => {
//         const randomUser = faker.random.arrayElement(users);
//         const randomCategories = faker.random.arrayElements(
//           categories,
//           faker.random.number({ min: 1, max: 4 })
//         );

//         const article = await prisma.article.create({
//           data: {
//             titre: faker.lorem.sentence(),
//             contenu: faker.lorem.paragraphs(),
//             image: faker.image.imageUrl(),
//             categorieId: randomCategories.map((c) => c.id), // Explicitly define the type
//             userId: randomUser.id,
//           },
//         });

//         // Create 0 to 20 comments for each article
//         const numComments = faker.random.number({ min: 0, max: 20 });
//         await Promise.all(
//           Array.from({ length: numComments }).map(async () => {
//             await prisma.commentaire.create({
//               data: {
//                 email: faker.internet.email(),
//                 contenu: faker.lorem.paragraph(),
//                 User: {
//                   connect: { email: randomUser.email },
//                 },
//                 Article: {
//                   connect: { id: article.id },
//                 },
//               },
//             });
//           })
//         );
//       })
//     );

//     console.log('Seed data created successfully!');
//   } catch (error) {
//     console.error('Error creating seed data:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// seed();

try {
  // createUsers();
  // createAdmin();
  createCategories();
} catch (error) {
  console.log(error);
}
