import { slugify } from "~/lib/utils";
import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { title, slug, content, metaDescription, published, publishedAt } =
    body;

  if (!title || !content) {
    throw createError({
      statusCode: 400,
      statusMessage: "Title, and content are required.",
    });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        slug: slug ? slug : slugify(title),
        content,
        metaDescription: metaDescription || null,
        published: published ?? true,
        publishedAt: published ? publishedAt || new Date() : null,
      },
    });

    return {
      status: "success",
      data: newPost,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create the post.",
      data: (error as Error).message,
    });
  }
});
