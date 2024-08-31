import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";

export default function ContactSection() {
  return (
    <section id="contact" className="mb-24">
      <h2 className="mb-6 font-serif text-2xl md:text-3xl">Contacto</h2>
      <Card>
        <CardContent className="mt-6 flex flex-col space-y-4">
          <div className="flex items-center text-base md:text-lg">
            <MapPinIcon className="mr-4 text-[#2c5545]" />
            <span>Valle de Chile Chico, Aysen-Patagonia</span>
          </div>
          <div className="flex items-center text-base md:text-lg">
            <PhoneIcon className="mr-4 text-[#2c5545]" />
            <span>+56940673741</span>
          </div>
          <div className="flex items-center text-base md:text-lg">
            <MailIcon className="mr-4 text-[#2c5545]" />
            <span>huerto@jeinimeni.com</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
