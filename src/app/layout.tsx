import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export const metadata: Metadata = {
  title: "Huerto Rio Jeinimeni",
  description:
    "  Cada día nos esforzamos por construir un futuro donde los alimentos se cultiven con cuidado, por y para las personas que comparten estos valores.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#f4f1ec]">
        <Navbar />
        <div className="mt-12 min-h-screen bg-[#f4f1ec] text-[#333333]">
          <main className="container mx-auto px-4">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
