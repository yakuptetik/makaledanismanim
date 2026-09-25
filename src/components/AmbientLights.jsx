export function AmbientLights({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-32 top-8 size-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute -left-20 bottom-16 size-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -right-28 top-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-16 bottom-8 size-80 rounded-full bg-amber-400/10 blur-3xl" />
    </div>
  );
}
