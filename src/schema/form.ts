import { z } from "zod";

export const formSchema = z.object({
  groups: z.array(z.string()).min(1, "Selecciona al menos un grupo"),
  why: z.string().min(10, "La respuesta debe tener al menos 10 caracteres"),
  experience: z
    .string()
    .min(10, "La respuesta debe tener al menos 10 caracteres"),
  knowledge: z
    .string()
    .min(10, "La respuesta debe tener al menos 10 caracteres"),
  skills: z.string().min(10, "La respuesta debe tener al menos 10 caracteres"),
});

const videoSchema = z.object({
  groups: z.array(z.string()).min(1, "Selecciona al menos un grupo"),
  video: z.instanceof(File),
});

export type FormData = z.infer<typeof formSchema>;
