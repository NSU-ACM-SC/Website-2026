import { GlobalCursor } from "@/components/cursor/GlobalCursor";
import { Footer } from "@/components/footer/Footer";
import { ChapterIntro } from "@/components/loader/ChapterIntro";
import { Navbar } from "@/components/navbar/Navbar";
import type { Metadata } from "next";
import "./editorial.css";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Space+Grotesk:wght@500;600;700;800&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f1eee7] text-black antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <GlobalCursor />
        <ChapterIntro />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
