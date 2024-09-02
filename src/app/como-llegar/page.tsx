"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import ContactSection from "~/components/contanct-section";
import { Button } from "~/components/ui/button";

export default function Component() {
  return (
    <div className="mx-4 md:mx-8">
      <section className="mb-24">
        <h1 className="mb-6 font-serif text-4xl">
          Cómo Llegar a Huerto Río Jeinimeni
        </h1>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN!}>
          <div className="mb-6 flex justify-center">
            <Map
              className="h-[40vh] w-full overflow-hidden rounded-md"
              style={{ width: "auto", height: "40vh" }}
              defaultCenter={{
                lat: -46.58920260557373,
                lng: -71.67549025663874,
              }}
              defaultZoom={18}
              mapTypeId="satellite"
              disableDefaultUI={true}
            >
              <Marker
                position={{ lat: -46.58920260557373, lng: -71.67549025663874 }}
              />
            </Map>
          </div>
        </APIProvider>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-serif text-2xl">Ubicación Geográfica</h2>
            <p className="mb-4">
              En la costa sur del Lago General Carrera y en la rivera oeste del
              Río Jeinimeni se genera una gran terraza sedimentaria que da lugar
              a nuestro hermoso huerto.
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
        <Link href="https://ventas.ferrypatagonia.com/" target="_blank">
          <Button className="mb-8">Comprar barcaza</Button>
        </Link>

        <h3 className="mb-4 font-serif text-2xl">Lugares de Interés</h3>
        <ul className="list-inside list-disc space-y-2">
          <li>
            A solo 5 km desde Chile Chico se encuentra la desembocadura del Río
            Jeinimeni
          </li>
          <li>A 17 km se encuentran los humedales y playa de Bahía Jara</li>
          <li>
            A 30 km se ubica el 1er acceso al P.N. Patagonia sendero Cueva de
            las Manos y el Valle Lunar
          </li>
          <li>
            A 60 km se ubica el acceso a sendero Escorial del Silencio, Mirador
            del Lago y Sendero de los Valles
          </li>
        </ul>
      </section>

      <section className="mb-24">
        <h2 className="mb-6 font-serif text-3xl">Preparación para tu Visita</h2>
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
      <ContactSection />
    </div>
  );
}
