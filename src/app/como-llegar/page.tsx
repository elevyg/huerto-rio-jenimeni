"use client";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Component() {
  return (
    <div className="min-h-screen bg-[#f4f1ec] text-[#333333]">
      <header className="sticky top-0 z-10 border-b border-[#2c5545] bg-[#f4f1ec] p-4 text-[#2c5545]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">HRJ</div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:underline">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/#program" className="hover:underline">
                  Programa
                </Link>
              </li>
              <li>
                <Link href="/#apply" className="hover:underline">
                  Aplicar
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:underline">
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-get-here"
                  className="font-bold hover:underline"
                >
                  Cómo Llegar
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto mt-12 px-4">
        <section className="mb-24">
          <h1 className="mb-6 font-serif text-4xl">
            Cómo Llegar a Huerto Río Jeinimeni
          </h1>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN!}>
            <Map
              className="h-[40vh] w-[90vw] overflow-hidden rounded-md"
              style={{ width: "90vw", height: "40vh" }}
              defaultCenter={{
                lat: -46.58920260557373,
                lng: -71.67549025663874,
              }}
              defaultZoom={18}
              mapTypeId="satellite"
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
          </APIProvider>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-serif text-2xl">Ubicación Geográfica</h2>
              <p className="mb-4">
                En la costa sur del Lago General Carrera y en la rivera oeste
                del Río Jeinimeni se genera una gran terraza sedimentaria que da
                lugar a #HuertoRioJeinimeni.
              </p>
              <div className="mb-4 flex items-center">
                <MapPinIcon className="mr-2 text-[#2c5545]" />
                <span>Valle de Chile Chico, Aysen-Patagonia</span>
              </div>
              <p className="text-sm">Coordenadas: -46.590296°, -71.675308°</p>
            </div>

            <div>
              <h2 className="mb-4 font-serif text-2xl">Micro Clima</h2>
              <p>
                La Cordillera de los Andes rodea la costa occidental hacia el
                norte y el sur del gran lago, y los fuertes vientos del Pacífico
                empujan la nubosidad hacia la pampa, provocando días soleados y
                ventosos y con las temperaturas más cálidas de la región.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">Transporte</h2>
          <p className="mb-4">
            El huerto se ubica a 8 km desde la zona urbana. Todos los días el
            staff ofrece un viaje hacia el pueblo al término de la jornada
            laboral. El regreso es responsabilidad individual.
          </p>
          <Button className="mb-8">Solicitar Transporte</Button>

          <h3 className="mb-4 font-serif text-2xl">Lugares de Interés</h3>
          <ul className="list-inside list-disc space-y-2">
            <li>
              A solo 5 km desde Chile Chico se encuentra la desembocadura del
              Río Jeinimeni
            </li>
            <li>A 17 km se encuentran los humedales y playa de Bahía Jara</li>
            <li>
              A 30 km se ubica el 1er acceso al P.N. Patagonia sendero
              #CuevadelasManos y #ValleLunar
            </li>
            <li>
              A 60 km se ubica el acceso a sendero #EscorialdelSilencio,
              #MiradordelLago y #SenderodelosValles
            </li>
          </ul>
        </section>

        <section className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">
            Preparación para tu Visita
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-serif text-2xl">Qué Traer</h3>
              <ul className="list-inside list-disc space-y-2">
                <li>Carpa</li>
                <li>Saco de dormir</li>
                <li>Abrigo</li>
                <li>Linterna</li>
                <li>Artículos personales</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl">Condiciones</h3>
              <ul className="list-inside list-disc space-y-2">
                <li>Tolerancia a condiciones climáticas adversas</li>
                <li>Capacidad de trabajo en equipo</li>
                <li>Disposición para trabajo físico y disciplinado</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="mb-24">
          <h2 className="mb-6 font-serif text-3xl">Contacto</h2>
          <div className="flex flex-col space-y-4">
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
          </div>
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
