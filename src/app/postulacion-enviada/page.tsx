"use client";
import { FaCheckCircle } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-24 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <FaCheckCircle className="mb-6 text-6xl text-green-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-6 font-serif text-3xl leading-tight md:text-5xl"
        >
          ¡Postulación enviada con éxito!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8 text-base md:text-lg"
        >
          ¡Felicidades! Tu aplicación está en camino hacia nuevas oportunidades.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-8 flex items-center"
        >
          <GiPartyPopper className="mr-2 text-3xl text-yellow-500" />
          <span className="text-2xl">¡Hora de celebrar!</span>
          <GiPartyPopper className="ml-2 text-3xl text-yellow-500" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/">
            <Button className="bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]">
              Volver al inicio
            </Button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
