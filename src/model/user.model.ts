import prisma from '../../prisma/prisma';
import { User } from '@prisma/client';

const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};

const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

const createUser = (
  name: string,
  email: string,
  hashedPassword: string,
  description: string
) => {
  return prisma.user.create({
    data: {
      nom: name, //TODO: i need to check if the name is unique
      email: email, // TODO: i need to check if the email is unique
      password: hashedPassword,
      description: description,
    },
  });
};

type UpdateableUserAttribute =
  | 'nom'
  | 'email'
  | 'password'
  | 'description';

const updateUserAttribute = <T extends UpdateableUserAttribute>(
  id: number,
  attributeName: T,
  value: string
) => {
  const updateData: Partial<User> = {};
  updateData[attributeName] = value;

  return prisma.user.update({
    where: {
      id: id,
    },
    data: updateData,
  });
};

const updateUserName = (id: number, name: string) => {
  return updateUserAttribute(id, 'nom', name);
};

const updateUserEmail = (id: number, email: string) => {
  return updateUserAttribute(id, 'email', email);
};

const updateUserPassword = (id: number, password: string) => {
  return updateUserAttribute(id, 'password', password);
};

const deleteUser = (id: number) => {
  return prisma.user.delete({
    where: {
      id: id,
    },
  });
};

export default {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
};
