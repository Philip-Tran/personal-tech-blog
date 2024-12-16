import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const totalPublishedPost = await prisma.post.count({
      where: {
        published: true,
      },
    });

    const totalPost = await prisma.post.count();

    return { totalPublishedPost: totalPublishedPost, totalPost: totalPost };
  } catch (error) {
    console.error("Error getting stat: ", (error as Error).message);
  }
});
