import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUserById = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: { id },
    });
    return user;
  } catch (error) {
    if (
      error instanceof Error &&
      error.code === "P2025" 
    ) {
      return null; 
    } else {
      throw new Error(`Error in deleting user: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default deleteUserById;