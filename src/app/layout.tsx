import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paternidade de Deus",
  description: "I Congresso Internacional de Teologia sobre a Paternidade de Deus",
  icons: {
    icon: "/figma-assets/3541becb5ea49349781bc802c00b5adbd28d4f70.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
