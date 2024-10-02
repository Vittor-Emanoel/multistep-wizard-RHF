import { z } from "zod";

export const accountStepSchema = z.object({
  email: z.string().email("Informe um email valido"),
  password: z.string().min(1, "Informe a senha"),
});
