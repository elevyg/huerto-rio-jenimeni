import { z } from "zod";

export const videoFormSchema = z.object({
  groups: z.array(z.string()).min(1, "Selecciona al menos un grupo"),
  videoURL: z.string().url("La URL del video no es válida"),
});
