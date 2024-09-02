import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NotionMagicLinkEmailProps {
  loginCode?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ApplicantEmail = ({ loginCode }: NotionMagicLinkEmailProps) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>Postulación de pasante</Preview>
      <Body className="bg-[#f4f1ec]">
        <Container className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3">
          <Container>
            <Img
              src={`${baseUrl}/static/logo.jpg`}
              width="100"
              height="100"
              alt="Huerto Jeinimeni Logo"
              className="bg-blue-500"
            />
          </Container>
          <Container>
            <Heading className="font-sans text-lg text-[#2c5545]">
              Postulación de pasante
            </Heading>
          </Container>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

ApplicantEmail.PreviewProps = {
  loginCode: "sparo-ndigo-amurt-secan",
} as NotionMagicLinkEmailProps;

export default ApplicantEmail;
