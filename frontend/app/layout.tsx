import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firebase + FastAPI + Next.js Template",
  description: "A modern full-stack template with Firebase, FastAPI, Next.js, React, TypeScript, and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
