import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenityById = async (amenityId, updatedAmenityData) => {
  try {
    const amenity = await prisma.amenity.update({
      where: { id: amenityId },
      data: updatedAmenityData,
    });
    return amenity;
  } catch (error) {
    if (error instanceof Error && error.code === "P2025") {
      return null; 
    } else {
      throw new Error(`Error in updating amenity: ${error.message}`);
    }
  } finally {
    await prisma.$disconnect();
  }
};

export default updateAmenityById;
