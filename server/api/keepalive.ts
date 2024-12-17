import { prisma } from "~/lib/prisma";

export const defineEventHandler = async () => {
  try {
    const posts = await prisma.post.findMany({
      take: 3,
    });
    console.log("Ping by cron job success");
    return { message: "Database pinged successfully", posts: posts };
  } catch (error) {
    console.log("Ping by cron job fail");
    return { Error: (error as Error).message };
  }
};
