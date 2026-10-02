import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import GlobalFooter from "@/components/GlobalFooter";

export const metadata: Metadata = {
  title: "পুজোর পথে — Discover the Puja, Follow the Path",
  description:
    "A digital journey through Bengal during Durga Puja. Discover pandals, explore regions, learn cultural stories, and build your Puja trail across Kolkata and Bengal.",
  keywords: [
    "Durga Puja",
    "Kolkata",
    "পুজো",
    "pandal",
    "পুজোর পথে",
    "Bengal",
    "festival",
    "পুজো পথ",
  ],
  openGraph: {
    title: "পুজোর পথে",
    description: "A digital journey through Bengal during Durga Puja.",
    locale: "bn_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="desktop-blocker">
          <div className="desktop-blocker-message">
            <h2>This Site was designed for Mobile Devices.</h2>
            <p>Please open in your phone for the best experience.</p>
          </div>
        </div>

        <div id="app-content">
          <Navbar />
          <main>{children}</main>
          
          <BackToTop />
          
          <GlobalFooter />
        </div>
      </body>
    </html>
  );
}
