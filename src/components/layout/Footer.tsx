type FooterLink = {
  href: string;
  label: string;
};

export function Footer({ links, logo, text }: { links?: FooterLink[]; logo: string; text: string }) {
  return (
    <footer className="footer">
      <img alt="Paternidade de Deus" src={logo} />
      <p>{text}</p>
      {links ? (
        <nav className="footer-links" aria-label="Links legais">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </footer>
  );
}

