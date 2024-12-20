import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const count: string | undefined = event.context.params?.count;

  if (!count) {
    return { error: "Count parameter is required." };
  }
  const postCount = parseInt(count, 10);

  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: postCount,
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        createdAt: true,
        published: true,
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
