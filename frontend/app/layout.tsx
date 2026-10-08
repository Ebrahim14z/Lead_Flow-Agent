import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Solutions | Contact Us",
  description:
    "Tell us about your business needs and our team will get back to you.",
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