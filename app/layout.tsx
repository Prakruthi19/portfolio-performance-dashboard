import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nordic Analytics | Portfolio Dashboard",
  description: "Institutional fund performance monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased bg-[#0d1117] text-[#e8f0fe] min-h-screen">
        {children}
      </body>
    </html>
  );
}
