import { slugify } from "~/lib/utils";
import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const postId = getRouterParam(event, "postId");

  const { title, slug, content, metaDescription, published } = body;

  if (!postId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Post ID is required.",
    });
  }

  const existingPost = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!existingPost) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found.",
    });
  }

  if (!title && !content) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "At least one field (title or content) must be provided for update.",
    });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug: slug || (title ? slugify(title) : undefined),
        content,
        metaDescription:
          metaDescription !== undefined ? metaDescription : undefined,
        published,
        updatedAt: new Date(),
      },
    });

    return {
      status: "success",
      data: updatedPost,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update the post.",
      data: (error as Error).message,
    });
  }
});
