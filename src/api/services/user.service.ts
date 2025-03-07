import prisma from "@/config/prisma.conf";
import { Prisma } from "@prisma/client";

/**
 * Finds many users that matches the given condition.
 * @param condition - The condition to find users with.
 * @returns The found users.
 */
export const getUsersByCondition = async (condition: Prisma.UserWhereInput) => {
  return await prisma.user.findMany({
    where: condition,
  });
};

/**
 * Finds the first user that matches the given condition.
 * @param condition - The condition to find the user with.
 * @returns The first found user, or null if no user is found.
 */
export const getAUserByCondition = async (condition: Prisma.UserWhereInput) => {
  return await prisma.user.findFirst({
    where: condition,
  });
};

/**
 * Creates a new user.
 * @param userData - The user data to create.
 * @returns The created user.
 */
export const createUser = async (userData: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: userData,
  });
};

/**
 * Updates an existing user.
 * @param userId - The id of the user to update.
 * @param updateData - The data to update the user with.
 * @returns The updated user.
 */
export const updateUser = async (
  userId: string,
  updateData: Prisma.UserUpdateInput
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
  });
};

/**
 * Deletes a user.
 * @param userId - The id of the user to delete.
 * @returns The deleted user.
 */
export const deleteUser = async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export default {
  getUsersByCondition,
  getAUserByCondition,
  createUser,
  updateUser,
  deleteUser,
};
