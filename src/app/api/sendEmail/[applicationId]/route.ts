import { type NextApiResponse, type NextApiRequest } from "next";
import { Resend } from "resend";

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { slug: string } },
) => {
  console.log(params);

  const resend = new Resend("re_123456789");

  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    html: "<p>it works!</p>",
  });
  return new Response("Hello World");
};
