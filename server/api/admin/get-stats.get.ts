import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const totalPublishedPost = await prisma.post.count({
      where: {
        published: true,
      },
    });

    const totalPosts = await prisma.post.count();

    return { totalPublishedPost: totalPublishedPost, totalPosts: totalPosts };
  } catch (error) {
    console.error("Error getting stat: ", (error as Error).message);
  }
});
