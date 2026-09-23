import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Gym Plan App",
  description: "Plan de gimnasio con Next.js y Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-neutral-900 text-neutral-100 min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
