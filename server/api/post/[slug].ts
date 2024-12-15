import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params as Record<string, string>;

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: `Post with slug ${slug} not found.`,
      });
    }

    return post;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error fetching the post.",
      data: (error as Error).message,
    });
  }
});
