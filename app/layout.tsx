import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BancActiu Social - BancActiu 2.0",
  description: "Ecosistema Modular BancActiu 2.0 - Generalitat de Catalunya i Ajuntament de Cornellà",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100" suppressHydrationWarning>
        <Script id="bancactiu-init" strategy="beforeInteractive">
          {`
            window.__BANCACTIU_APP__ = "bancactiu-social";
            window.__BANCACTIU_ENV__ = "production";
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
