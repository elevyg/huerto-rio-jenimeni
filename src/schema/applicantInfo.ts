import { z } from "zod";

export const applicantSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .min(6, "El número de teléfono debe tener al menos 6 dígitos"),
  email: z.string().email("El correo electrónico no es válido"),
});

export type ApplicantSchema = z.infer<typeof applicantSchema>;
