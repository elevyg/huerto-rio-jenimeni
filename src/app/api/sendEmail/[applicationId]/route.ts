import ApplicantEmail from "react-email/emails/applicant-email";
import { Resend } from "resend";
import getApplication from "~/server/getApplication";

export const GET = async (
  req: Request,
  { params }: { params: { applicationId: string } },
) => {
  const application = await getApplication({
    applicationId: Number(params.applicationId),
  });

  if (!application.User) {
    return new Response("User not found", { status: 404 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Huerto Jeinimeni <huerto@jeinimeni.com>",
    to: [application.User?.email, "huertojeinimeni@gmail.com"],
    subject: `¡Gracias ${application.User?.name} por tu interés en Huerto Jeinimeni!`,
    react: ApplicantEmail({ application }),
  });

  return new Response(
    `Email sent to ${application.User?.email} and huerto@jeinimeni.com`,
  );
};
