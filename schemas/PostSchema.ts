import * as z from "zod";

const addPostSchema = z.object({
  title: z.string().min(8),
  content: z.string().min(18).default("Start writing here"),
});

export { addPostSchema };
