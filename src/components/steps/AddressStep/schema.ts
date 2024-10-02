import { z } from "zod";

export const addressStepSchema = z.object({
  state: z.string().min(1, "Informe o seu Estado"),
  city: z.string().min(1, "Informe a sua Cidade"),
  street: z.string().min(1, "Informe a sua Rua"),
});
