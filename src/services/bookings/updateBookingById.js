import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  const { propertyId, userId, ...rest } = updatedBooking;

  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...rest,
      userId: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      properties: propertyId
        ? {
            set: propertyId.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  return booking;
};

export default updateBookingById;