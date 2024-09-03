import { z } from "zod";

export const applicantSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "El número de teléfono debe ser válido, incluyendo el código de país",
    ),
  email: z.string().email("El correo electrónico no es válido"),
});

export type ApplicantSchema = z.infer<typeof applicantSchema>;
