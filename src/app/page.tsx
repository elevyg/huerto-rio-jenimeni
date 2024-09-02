import Image from "next/image";
import ApplySection from "~/app/apply-section";
import ContactSection from "~/components/contanct-section";
import { Button } from "~/components/ui/button";
import Tasks from "./tasks";
import Link from "next/link";

export default function Component() {
  return (
    <div>
      <section
        id="hero"
        className="relative mb-24 flex h-[70vh] flex-col items-center justify-center overflow-hidden rounded-lg md:flex-row"
      >
        <Image
          src="/images/huerto.jpg"
          alt="Huerto Río Jeinimeni"
          fill
          sizes="100vw"
          priority
          quality={90}
          className="z-10 object-cover"
        />
        <div className="z-20 mb-8 px-8 text-white md:mb-0 md:flex-1">
          <h2 className="mb-6 font-serif text-3xl leading-tight md:text-5xl">
            Cada día nos esforzamos por construir un futuro donde los alimentos
            se cultiven con cuidado, por y para las personas que comparten estos
            valores.
          </h2>
          <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
            Conócenos
          </Button>
        </div>
      </section>

      <section
        id="about"
        className="mb-24 flex flex-col items-center md:flex-row"
      >
        <div className="mb-8 md:mb-0 md:w-1/2">
          <Image
            src="/images/invernadero.jpg"
            alt="Invernadero en Huerto Río Jeinimeni"
            width={600}
            height={400}
            className="w-full rounded-lg"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
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
          <Link href="/como-llegar">
            <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
              Como llegar
            </Button>
          </Link>
        </div>
      </section>

      <section
        id="program"
        className="mb-24 flex flex-col items-center md:flex-row"
      >
        <div className="flex-1">
          <h2 className="mb-6 font-serif text-2xl md:text-3xl">
            Programa de Pasantes
          </h2>
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
            <Link href="/#apply" scroll>
              <Button className="mt-8 bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
                Postular
              </Button>
            </Link>
          </div>
        </div>
        <div className="mb-8 flex-1 md:mb-0 md:w-1/2">
          <Image
            src="/images/voluntarios.jpg"
            alt="Voluntarios en Huerto Río Jeinimeni"
            width={600}
            height={400}
            className="w-full rounded-lg object-cover"
            priority
            loading="eager"
          />
        </div>
      </section>
      <Tasks />
      <ApplySection />
      <ContactSection />
    </div>
  );
}
