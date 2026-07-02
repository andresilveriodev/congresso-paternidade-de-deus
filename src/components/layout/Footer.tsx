export function Footer({ logo, text }: { logo: string; text: string }) {
  return (
    <footer className="footer">
      <img alt="Paternidade de Deus" src={logo} />
      <p>{text}</p>
    </footer>
  );
}

