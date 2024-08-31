import Image from "next/image";
import ApplySection from "~/app/apply-section";
import ContactSection from "~/components/contanct-section";
import { Button } from "~/components/ui/button";
import Tasks from "./tasks";

export default function Component() {
  return (
    <div>
      <section
        id="hero"
        className="mb-24 flex flex-col items-center md:flex-row"
      >
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h2 className="mb-6 font-serif text-3xl leading-tight md:text-5xl">
            Cada día nos esforzamos por construir un futuro donde los alimentos
            se cultiven con cuidado, por y para las personas que comparten estos
            valores.
          </h2>
          <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
            Conócenos
          </Button>
        </div>
        <div className="flex justify-center md:w-1/2">
          {/* <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20HUERTO%20RIO%20JEINIMENI_Mesa%20de%20trabajo%201%20copia%204-iu75u2HU161TZybIUKmrXK4HS6D6BS.jpg"
              alt="Huerto Río Jeinimeni Logo"
              width={300}
              height={300}
              className="rounded-full"
            /> */}
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
            className="w-full rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-12">
          <h2 className="mb-6 font-serif text-2xl md:text-3xl">
            Sobre Huerto Río Jeinimeni
          </h2>
          <p className="mb-6 text-base md:text-lg">
            Durante años, hemos estado cultivando la tierra, compartiendo
            conocimientos y creando conciencia sobre la importancia vital de la
            agricultura regenerativa en nuestro sistema alimentario.
          </p>
          <p className="mb-6 text-base md:text-lg">
            Ubicado en el hermoso Valle de Chile Chico, Aysén-Patagonia, Huerto
            Río Jeinimeni ofrece una experiencia única de voluntariado en
            agricultura regenerativa, con el objetivo de desarrollar sistemas
            alimentarios sostenibles y resilientes.
          </p>
          <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
            Más información
          </Button>
        </div>
      </section>

      <section id="program" className="mb-24">
        <h2 className="mb-6 font-serif text-2xl md:text-3xl">
          Programa de Pasantes
        </h2>
        <Tasks />
        <div className="mt-4">
          <h3 className="mb-4 font-serif text-xl md:text-2xl">Requisitos:</h3>
          <ul className="list-inside list-disc space-y-2 text-base md:text-lg">
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
      <ApplySection />
      <ContactSection />
    </div>
  );
}
