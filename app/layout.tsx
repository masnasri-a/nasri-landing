import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import SplashWrapper from "@/components/SplashWrapper";

export const metadata: Metadata = {
  title: "Nasri Adzlani — Full-stack, Blockchain & Data Engineer",
  description:
    "Software engineer specializing in full-stack development, blockchain, and data engineering. 5+ years experience across 6 companies.",
  keywords: [
    "Nasri Adzlani",
    "Full-stack Engineer",
    "Blockchain Developer",
    "Data Engineer",
    "Next.js",
    "Golang",
    "Solidity",
    "Rust",
    "Indonesia",
  ],
  authors: [{ name: "Nasri Adzlani", url: "https://github.com/masnasri-a" }],
  creator: "Nasri Adzlani",
  metadataBase: new URL("https://nasriadzlani.dev"),
  openGraph: {
    title: "Nasri Adzlani — Full-stack, Blockchain & Data Engineer",
    description:
      "Software engineer specializing in full-stack development, blockchain, and data engineering. 5+ years experience across 6 companies.",
    type: "website",
    locale: "en_US",
    siteName: "Nasri Adzlani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasri Adzlani — Full-stack, Blockchain & Data Engineer",
    description:
      "Software engineer specializing in full-stack development, blockchain, and data engineering.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nasri Adzlani",
              jobTitle: "Full-stack, Blockchain & Data Engineer",
              email: "nasriadzlani@live.com",
              telephone: "+62 82228893284",
              url: "https://nasriadzlani.dev",
              sameAs: [
                "https://github.com/masnasri-a",
                "https://www.linkedin.com/in/nasri-adzlani-477620165",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full">
        <SplashWrapper>
          <CustomCursor />
          {children}
          <ScrollToTop />
        </SplashWrapper>
      </body>
    </html>
  );
}
