import {
  Body,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Tailwind,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";
import { type Application } from "~/server/getApplication";
import { schedule } from "~/data/program-data";

type Props = { application: Application };

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ApplicantEmail = ({ application }: Props) => (
  <Html>
    <Tailwind>
      <Head />
      <Preview>Postulación de pasante</Preview>
      <Body className="bg-[#f4f1ec]">
        <Row className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3">
          <Column>
            <Img
              src={`${baseUrl}/static/logo.jpg`}
              width="100"
              height="100"
              alt="Huerto Jeinimeni Logo"
              className="bg-blue-500"
            />
          </Column>
          <Column>
            <Heading className="font-sans text-lg text-[#2c5545]">
              Postulación de pasante
            </Heading>
          </Column>
        </Row>
        <Row className="mb-8">
          <Column className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3 font-sans">
            <Row>
              <Text className="text-3xl">Info del pasante</Text>
            </Row>
            <Row>
              <Text>Nombre: {application.User?.name}</Text>
              <Text>Teléfono: {application.User?.phone}</Text>
              <Text>Correo: {application.User?.email}</Text>
            </Row>
          </Column>
        </Row>
        <Row className="mb-8">
          <Column className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3 font-sans">
            <Text>Grupos que postuló:</Text>
            <ul>
              {application.groups
                .sort(
                  (a, b) =>
                    parseInt(a.substring(a.length - 1)) -
                    parseInt(b.substring(b.length - 1)),
                )
                .map((group) => (
                  <li key={group}>
                    {group}:{" "}
                    {schedule.find((s) => s.group === group)?.dateRange}
                  </li>
                ))}
            </ul>
          </Column>
        </Row>
        {application.videoApplication && (
          <Row className="mb-8">
            <Column className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3 font-sans">
              <Row>
                <Text className="text-3xl">Video del pasante</Text>
              </Row>
              <Row>
                <Text>
                  <Link href={application.videoApplication.videoURL}>
                    Ver video
                  </Link>
                </Text>
              </Row>
            </Column>
          </Row>
        )}
        {application.formApplication && (
          <Row className="mb-8">
            <Column className="mx-auto my-4 rounded-md border border-solid border-gray-400 bg-white p-3 font-sans">
              <Row>
                <Text className="text-3xl">Respuestas del formulario</Text>
              </Row>
              <Row className="flex flex-col">
                <Text className="font-bold">¿Por qué te gustaría venir?</Text>
                <Text>{application.formApplication.why}</Text>
              </Row>
              <Row>
                <Text className="font-bold">
                  ¿Qué experiencia previa tienes?
                </Text>
                <Text>{application.formApplication.experience}</Text>
              </Row>
              <Row>
                <Text className="font-bold">
                  ¿Qué harás con el conocimiento adquirido?
                </Text>
                <Text>{application.formApplication.knowledge}</Text>
              </Row>
              <Row>
                <Text className="font-bold">
                  ¿Cuáles son tus habilidades y competencias que puedes aportar
                  al huerto?
                </Text>
                <Text>{application.formApplication.skills}</Text>
              </Row>
            </Column>
          </Row>
        )}
      </Body>
    </Tailwind>
  </Html>
);

ApplicantEmail.PreviewProps = {
  application: {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
    groups: ["Grupo 3", "Grupo 1", "Grupo 2"], // Add this line
    User: {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
      baseApplicationId: 1,
    },
    formApplication: {
      id: 1,
      applicationId: 1,
      why: "Sample reason",
      experience: "Sample experience",
      knowledge: "Sample knowledge",
      skills: "Sample skills",
    },
    videoApplication: {
      id: 1,
      applicationId: 1,
      videoURL: "https://example.com/video",
    },
  },
} as Props;

export default ApplicantEmail;
