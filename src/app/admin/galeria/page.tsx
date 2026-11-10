import type { Metadata } from "next";
import { GalleryAdmin } from "@/components/congresso/GalleryAdmin";
import "./painel.css";

export const metadata: Metadata = {
  title: "Painel de fotos | Congresso Paternidade de Deus",
  robots: { index: false, follow: false }
};

export default function GalleryAdminPage() { return <GalleryAdmin />; }
