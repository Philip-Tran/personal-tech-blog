import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const totalPost = await prisma.post.count({
      where: {
        published: true,
      },
    });

    return totalPost;
  } catch (error) {
    console.error("Error getting stat: ", (error as Error).message);
  }
});
