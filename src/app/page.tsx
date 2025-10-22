export default function Home() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Racquet Sports Institute";
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  return (
    <main className="min-h-[60vh] mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{appName}</h1>

      <div className="rounded-2xl p-5 border" style={{ borderColor: "var(--brand-primary)" }}>
        <p className="text-sm opacity-80">Brand Preview</p>
        <div className="mt-3 flex gap-3">
          <div className="h-10 w-10 rounded-full" style={{ background: "var(--brand-primary)" }} />
          <div className="h-10 w-10 rounded-full" style={{ background: "var(--brand-accent)" }} />
        </div>
      </div>

      {backend && (
        <a
          href={`${backend}/health`}
          target="_blank"
          className="inline-block rounded-2xl px-4 py-2 text-white"
          style={{ background: "var(--brand-primary)" }}
        >
          Backend Health öffnen
        </a>
      )}
    </main>
  );
}
