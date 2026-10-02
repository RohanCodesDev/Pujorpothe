import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali, Cormorant_Garamond, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import GlobalFooter from "@/components/GlobalFooter";
import LenisScroll from "@/components/LenisScroll";

const hindSiliguri = Hind_Siliguri({ subsets: ["bengali"], weight: ["300", "400", "500", "600", "700"], variable: "--font-bengali" });
const notoSerifBengali = Noto_Serif_Bengali({ subsets: ["bengali"], weight: ["300", "400", "500", "600", "700"], variable: "--font-bengali-serif" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-display" });
const josefin = Josefin_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-body" });

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
      </head>
      <body className={`${hindSiliguri.variable} ${notoSerifBengali.variable} ${cormorant.variable} ${josefin.variable}`}>
        <LenisScroll />
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
