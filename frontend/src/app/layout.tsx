import TargetCursor from "@/components/cursor/TargetCursor";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./editorial.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NSU ACM Student Chapter | North South University",
  description:
    "Official public website for NSU ACM Student Chapter (NSU ACM SC). Discover student research, competitive programming, SIGs, hackathons, and member roster.",
  keywords: [
    "NSU ACM SC",
    "North South University",
    "ACM Student Chapter",
    "HackStorm",
    "R&D Group",
    "Web Group",
    "Admin Group",
    "Media and Documentation Group",
    "Design and Decor Group",
    "Cultural Group",
    "Competitive Programming",
    "Research",
  ],
  authors: [{ name: "NSU ACM SC Technical Wing" }],
  openGraph: {
    title: "NSU ACM Student Chapter | Code. Research. Dominate. Scale.",
    description:
      "The premier student-led computing and engineering community in Bangladesh. Chartered by ACM HQ #92841.",
    url: "https://nsuacmsc.org",
    siteName: "NSU ACM Student Chapter",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-[#f1eee7] text-black antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
        />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
