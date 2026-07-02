import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Paternidade de Deus",
  description: "I Congresso Internacional de Teologia sobre a Paternidade de Deus",
  icons: {
    icon: "/favicom.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
