import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Racquet Sports Institute",
  description: "Racquet Sports Institute",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const brandPrimary = process.env.NEXT_PUBLIC_BRAND_PRIMARY || "#0C2340";
  const brandAccent  = process.env.NEXT_PUBLIC_BRAND_ACCENT  || "#FFD166";

  return (
    <html lang="en">
      <body
        className="min-h-screen bg-[#F9FAFB] text-[#111827]"
        style={
          {
            // Globale CSS-Variablen für Tailwind-Nutzung
            ["--brand-primary" as any]: brandPrimary,
            ["--brand-accent" as any]: brandAccent,
          } as React.CSSProperties
        }
      >
        <div className="mx-auto max-w-5xl p-6">{children}</div>
      </body>
    </html>
  );
}
