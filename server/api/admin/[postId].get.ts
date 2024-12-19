import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "postId");

  if (!postId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Post ID is required.",
    });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        metaDescription: true,
        published: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Post not found.",
      });
    }

    return { data: post };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch the post.",
      data: (error as Error).message,
    });
  }
});
