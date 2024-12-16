import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (posts.length === 0) {
      throw createError({
        statusCode: 404,
        message: "No posts found",
      });
    }

    return posts;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
});
