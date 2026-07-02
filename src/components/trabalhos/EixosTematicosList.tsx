export function EixosTematicosList({ items }: { items: string[] }) {
  return (
    <p>
      {items.map((line) => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
}

