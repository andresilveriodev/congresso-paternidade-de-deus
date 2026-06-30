import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paternidade de Deus",
  description: "I Congresso Internacional de Teologia sobre a Paternidade de Deus",
  icons: {
    icon: "/favicom.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
