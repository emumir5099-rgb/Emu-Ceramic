import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "EMU CERAMIC",
    template: "%s | EMU CERAMIC",
  },
  description:
    "Discover elegant ceramic tiles, marble designs, and premium surfaces with EMU CERAMIC.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#FAF8F3] text-[#183B35]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}