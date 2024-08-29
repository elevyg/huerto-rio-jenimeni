"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

const programData = [
  {
    id: "G1",
    dates: "08 Sept / 22 Sept",
    tasks: { c: true, alm: true, sd: true, tp: false, c2: false, tt: true },
  },
  {
    id: "G2",
    dates: "06 Oct / 20 Oct",
    tasks: { c: true, alm: true, sd: true, tp: true, c2: false, tt: true },
  },
  {
    id: "G3",
    dates: "10 Nov / 24 Nov",
    tasks: { c: true, alm: false, sd: true, tp: true, c2: true, tt: true },
  },
  {
    id: "G4",
    dates: "8 Dic / 22 Dic",
    tasks: { c: true, alm: false, sd: false, tp: true, c2: true, tt: false },
  },
  {
    id: "G5",
    dates: "12 En / 26 En",
    tasks: { c: true, alm: true, sd: false, tp: false, c2: true, tt: true },
  },
  {
    id: "G6",
    dates: "9 Feb / 23 Feb",
    tasks: { c: true, alm: true, sd: true, tp: false, c2: true, tt: true },
  },
  {
    id: "G7",
    dates: "9 Mar / 23 Mar",
    tasks: { c: true, alm: true, sd: true, tp: true, c2: false, tt: true },
  },
  {
    id: "G8",
    dates: "6 Abril / 20 Abr",
    tasks: { c: true, alm: true, sd: true, tp: true, c2: false, tt: true },
  },
];

export default function Component() {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ec] text-[#333333]">
      <header className="sticky top-0 z-10 border-b border-[#2c5545] bg-[#f4f1ec] p-4 text-[#2c5545]">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="flex-1">
            <ul className="flex space-x-6">
              <li>
                <a href="#about" className="hover:underline">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#program" className="hover:underline">
                  Programa
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex flex-1 justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20HUERTO%20RIO%20JEINIMENI_Mesa%20de%20trabajo%201%20copia%204-iu75u2HU161TZybIUKmrXK4HS6D6BS.jpg"
              alt="Huerto Río Jeinimeni Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <nav className="flex flex-1 justify-end">
            <ul className="flex space-x-6">
              <li>
                <a href="#apply" className="hover:underline">
                  Aplicar
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-12 px-4">
        <section
          id="hero"
          className="mb-24 flex flex-col items-center md:flex-row"
        >
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="mb-6 font-serif text-5xl leading-tight">
              Cada día nos esforzamos por construir un futuro donde los
              alimentos se cultiven con cuidado, por y para las personas que
              comparten estos valores.
            </h1>
            <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
              Conócenos
            </Button>
          </div>
          <div className="flex justify-center md:w-1/2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20HUERTO%20RIO%20JEINIMENI_Mesa%20de%20trabajo%201%20copia%204-iu75u2HU161TZybIUKmrXK4HS6D6BS.jpg"
              alt="Huerto Río Jeinimeni Logo"
              width={400}
              height={400}
              className="rounded-full"
            />
          </div>
        </section>

        <section
          id="about"
          className="mb-24 flex flex-col items-center md:flex-row"
        >
          <div className="mb-8 md:mb-0 md:w-1/2">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Voluntarios en Huerto Río Jeinimeni"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="mb-6 font-serif text-3xl">
              Sobre Huerto Río Jeinimeni
            </h2>
            <p className="mb-6 text-lg">
              Durante años, hemos estado cultivando la tierra, compartiendo
              conocimientos y creando conciencia sobre la importancia vital de
              la agricultura regenerativa en nuestro sistema alimentario.
            </p>
            <p className="mb-6 text-lg">
              Ubicado en el hermoso Valle de Chile Chico, Aysén-Patagonia,
              Huerto Río Jeinimeni ofrece una experiencia única de voluntariado
              en agricultura regenerativa, con el objetivo de desarrollar
              sistemas alimentarios sostenibles y resilientes.
            </p>
            <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
              Más información
            </Button>
          </div>
        </section>

        <section id="program" className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">Programa de Pasantes</h2>
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#2c5545] text-white">
                  <th className="p-2 text-left">Generación</th>
                  <th className="p-2 text-left">Fechas</th>
                  <th className="p-2 text-center">Cosecha</th>
                  <th className="p-2 text-center">Almácigos</th>
                  <th className="p-2 text-center">Siembra directa</th>
                  <th className="p-2 text-center">Transplante</th>
                  <th className="p-2 text-center">Cosecha</th>
                  <th className="p-2 text-center">Trabajo tierra</th>
                </tr>
              </thead>
              <tbody>
                {programData.map((row) => (
                  <tr key={row.id} className="border-b border-[#2c5545]">
                    <td className="p-2">{row.id}</td>
                    <td className="p-2">{row.dates}</td>
                    {Object.entries(row.tasks).map(([task, active]) => (
                      <td
                        key={task}
                        className="p-2 text-center"
                        onMouseEnter={() => setHoveredTask(task)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                        <div
                          className={`transition-all duration-200 ${
                            hoveredTask === task ? "scale-120" : ""
                          } ${active ? "text-[#2c5545]" : "text-[#ccc]"}`}
                        >
                          {active ? "✓" : "✗"}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h3 className="mb-4 font-serif text-2xl">Requisitos:</h3>
            <ul className="list-inside list-disc space-y-2 text-lg">
              <li>Capacidad de trabajo en equipo</li>
              <li>Tolerancia a condiciones climáticas adversas</li>
              <li>Interés en aspectos de la producción comercial</li>
              <li>Trabajo físico y disciplinado</li>
              <li>Estadía mínima 14 días</li>
              <li>Jornada laboral de 8 hrs</li>
              <li>Alojamiento en camping</li>
              <li>
                Traer carpa, saco de dormir, abrigo, linterna y art. personal
              </li>
            </ul>
          </div>
        </section>

        <section id="apply" className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">Aplicar al Programa</h2>
          <Tabs defaultValue="video">
            <TabsList className="mb-6">
              <TabsTrigger value="video" className="text-lg">
                Video
              </TabsTrigger>
              <TabsTrigger value="form" className="text-lg">
                Formulario
              </TabsTrigger>
            </TabsList>
            <TabsContent value="video">
              <Card>
                <CardContent>
                  <div className="mt-6 space-y-6">
                    <p className="text-lg">
                      Sube un video respondiendo a las siguientes preguntas:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-lg">
                      <li>¿Por qué te gustaría venir?</li>
                      <li>¿Qué experiencia previa tienes?</li>
                      <li>¿Qué harás con el conocimiento adquirido?</li>
                      <li>
                        ¿Cuáles son tus habilidades y competencias que puedes
                        aportar al huerto?
                      </li>
                    </ul>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="text-lg"
                    />
                    {videoFile && (
                      <p className="text-lg">
                        Archivo seleccionado: {videoFile.name}
                      </p>
                    )}
                    <Button
                      type="submit"
                      className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]"
                    >
                      Subir Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="form">
              <Card>
                <CardContent>
                  <form className="mt-6 space-y-6">
                    <div>
                      <label htmlFor="why" className="mb-2 block text-lg">
                        ¿Por qué te gustaría venir?
                      </label>
                      <Textarea
                        id="why"
                        placeholder="Tu respuesta..."
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="experience"
                        className="mb-2 block text-lg"
                      >
                        ¿Qué experiencia previa tienes?
                      </label>
                      <Textarea
                        id="experience"
                        placeholder="Tu respuesta..."
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="knowledge" className="mb-2 block text-lg">
                        ¿Qué harás con el conocimiento adquirido?
                      </label>
                      <Textarea
                        id="knowledge"
                        placeholder="Tu respuesta..."
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="skills" className="mb-2 block text-lg">
                        ¿Cuáles son tus habilidades y competencias que puedes
                        aportar al huerto?
                      </label>
                      <Textarea
                        id="skills"
                        placeholder="Tu respuesta..."
                        className="w-full"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]"
                    >
                      Enviar Aplicación
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section id="contact" className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">Contacto</h2>
          <Card>
            <CardContent className="mt-6 flex flex-col space-y-4">
              <div className="flex items-center text-lg">
                <MapPinIcon className="mr-4 text-[#2c5545]" />
                <span>Valle de Chile Chico, Aysen-Patagonia</span>
              </div>
              <div className="flex items-center text-lg">
                <PhoneIcon className="mr-4 text-[#2c5545]" />
                <span>+56940673741</span>
              </div>
              <div className="flex items-center text-lg">
                <MailIcon className="mr-4 text-[#2c5545]" />
                <span>huertoriojeinimeni@gmail.com</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-12 bg-[#2c5545] p-6 text-white">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            &copy; 2024 Huerto Río Jeinimeni. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
