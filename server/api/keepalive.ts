import { prisma } from "~/lib/prisma";

export default defineEventHandler(async () => {
  try {
    const posts = await prisma.post.findMany({
      take: 1,
    });
    console.log("Ping by cron job success");
    return { message: "Database pinged successfully", posts: posts };
  } catch (error) {
    console.log("Ping by cron job fail");
    return { Error: (error as Error).message };
  }
});
