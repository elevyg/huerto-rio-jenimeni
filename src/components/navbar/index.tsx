"use client";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 border-b border-[#2c5545] bg-[#f4f1ec] p-4 text-[#2c5545]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="hover:underline">
            <Image
              src="/images/logo.jpg"
              alt="Huerto Río Jeinimeni Logo"
              width={60}
              height={60}
              className="mr-4 rounded-full"
            />
          </Link>
          <h1 className="hidden text-xl font-semibold md:block">
            <Link href="/" className="hover:underline">
              Huerto Río Jeinimeni
            </Link>
          </h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
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
              <Link className="hover:underline" href="/como-llegar">
                Como Llegar
              </Link>
            </li>
          </ul>
        </nav>
        <Button
          className="md:hidden"
          variant="ghost"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon />
        </Button>
      </div>
      {mobileMenuOpen && (
        <nav className="mt-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                href="/#about"
                className="block rounded px-4 py-2 hover:bg-[#2c5545] hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link
                href="/#program"
                className="block rounded px-4 py-2 hover:bg-[#2c5545] hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Programa
              </Link>
            </li>
            <li>
              <Link
                href="/#apply"
                className="block rounded px-4 py-2 hover:bg-[#2c5545] hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Aplicar
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="block rounded px-4 py-2 hover:bg-[#2c5545] hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </li>
            <li>
              <Link
                className="block rounded px-4 py-2 hover:bg-[#2c5545] hover:text-white"
                href="/como-llegar"
                onClick={() => setMobileMenuOpen(false)}
              >
                Como Llegar
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
