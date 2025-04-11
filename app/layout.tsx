import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataLinks starter app",
  description: "Search your data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
