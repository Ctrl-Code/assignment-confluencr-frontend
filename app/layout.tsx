import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignment - Confluencr",
  description: "Assignment for Confluencr by ctrl-code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <!-- Translucent Header --> */}
        <header className="header">
            <a href="/" className="header__logo">Assignment - Confluencr</a>
            {/* <nav className="header__nav">
                <a href="/" className="header__nav-link">Home</a>
                <a href="/newsletter" className="header__nav-link">Newsletter</a>
                <a href="/contact" className="header__nav-link">Talk to Us</a>
            </nav> */}
            {/* <button className="header__cta">Get Started</button> */}
        </header>
        {children}
      </body>
    </html>
  );
}
