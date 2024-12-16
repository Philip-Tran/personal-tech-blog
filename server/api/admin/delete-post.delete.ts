import { prisma } from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);

    await prisma.post.delete({
      where: {
        id,
      },
    });
    console.log("Delete post successfully");
    return { success: true, message: "Delete Post successfully" };
  } catch (error) {
    console.error("Error", (error as Error).message);
  }
});
