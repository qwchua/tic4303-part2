import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  phoneNumber: z.string().min(1),
  country: z.string().min(1),
  gender: z.string().min(1),
  qualification: z.string().min(1),
});
