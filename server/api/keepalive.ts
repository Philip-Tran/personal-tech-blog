import { prisma } from "~/lib/prisma";

export const defineEventHandler = async () => {
  try {
    const posts = await prisma.post.findMany();

    return { message: "Database pinged successfully", posts: posts };
  } catch (error) {
    return { Error: (error as Error).message };
  }
};
