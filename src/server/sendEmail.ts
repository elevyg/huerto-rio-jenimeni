"use server";
import ApplicantEmail from "react-email/emails/applicant-email";
import { Resend } from "resend";
import { type Application } from "~/server/getApplication";

export default async function sendEmail({
  application,
}: {
  application: Application;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  if (!application.User) {
    return new Error("User not found");
  }

  return resend.emails.send({
    from: "Huerto Jeinimeni <huerto@mail.jeinimeni.com>",
    to: [
      application.User?.email,
      "huerto@jeinimeni.com",
      "huertojeinimeni@gmail.com",
    ],
    subject: `¡Gracias ${application.User?.name} por tu interés en Huerto Jeinimeni!`,
    react: ApplicantEmail({ application }),
  });
}
