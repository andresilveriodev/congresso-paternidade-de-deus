import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <h1>Página não encontrada</h1>
      <p>O endereço informado não existe ou não está disponível neste idioma.</p>
      <Link className="cta-button compact" href="/pt">
        Voltar para o início
      </Link>
    </main>
  );
}

