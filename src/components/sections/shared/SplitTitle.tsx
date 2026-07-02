export function SplitTitle({ first, second }: { first: string; second?: string }) {
  return (
    <h2>
      {first}
      {second ? <span>{second}</span> : null}
    </h2>
  );
}

