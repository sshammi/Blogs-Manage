import { z } from "zod";

const BlogCreateValidationSchema =z.object({
  body: z.object({
    title: z.string({ required_error: 'title is required.' }),
    content: z.string({ required_error: 'content is required.' }),
    author: z.string().optional(),
    role:z.enum(['admin','user']).default('user'),
    isPublished:z.boolean().default(true)
  }),
})
const BlogUpdateValidationSchema =z.object({
    body: z.object({
      title: z.string({ required_error: 'title is required.' }).optional(),
      content: z.string({ required_error: 'content is required.' }).optional(),
      author: z.string({ required_error: 'author is required' }).optional(),
      role:z.enum(['admin','user']).default('user').optional(),
      isPublished:z.boolean().default(true)
    }),
  })

export const BlogValidation={
    BlogCreateValidationSchema,
    BlogUpdateValidationSchema,
}