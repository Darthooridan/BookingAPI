import { PrismaClient } from "@prisma/client";

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const newUser = {
    id,
    username,
    password,
    name,
    email,
    phoneNumber,
    profilePicture,
  };

  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export default createUser;