import { Resend } from "resend";

const sendErrorEmail = async (error: Error) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const errorMessage = `Error: ${error.message}\nStack: ${error.stack}`;

  const data = {
    from: "huerto@jeinimeni.com",
    to: ["elevyg91@gmail.com"],
    subject: "Error en la aplicación",
    html: `<p>${errorMessage}</p>`,
  };

  try {
    const response = await resend.emails.send(data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export default sendErrorEmail;
