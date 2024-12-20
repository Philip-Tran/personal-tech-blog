import * as z from "zod";

const addPostSchema = z.object({
  title: z.string().min(8).nonempty(),
  content: z.string().min(18),
  published: z.boolean().default(true),
});

export { addPostSchema };
