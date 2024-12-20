import { z } from "zod";

export const userCreateValidationSchema =z.object({
  body: z.object({
    name: z.string({ required_error: 'name is required.' }),
    email: z.string({ required_error: 'email is required.' }).email(),
    password: z.string({ required_error: 'Password is required' }),
    role:z.enum(['admin','user']).default('user'),
    isBlocked:z.boolean().default(false)
  }),
});
