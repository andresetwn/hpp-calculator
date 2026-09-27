import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const THEME_STORAGE_KEY = "hpp-calculator-theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kalkulator HPP - Hitung Harga Pokok Penjualan",
  description:
    "Kalkulator HPP online untuk menghitung biaya bahan baku, tenaga kerja, overhead, HPP per unit, dan estimasi harga jual produk.",
  keywords: [
    "kalkulator HPP",
    "harga pokok penjualan",
    "HPP",
    "kalkulator biaya produksi",
    "UMKM",
    "harga jual",
  ],
  authors: [{ name: "HPP Calculator" }],
  openGraph: {
    title: "Kalkulator HPP - Hitung Harga Pokok Penjualan",
    description:
      "Kalkulator HPP online untuk menghitung biaya bahan baku, tenaga kerja, overhead, HPP per unit, dan estimasi harga jual produk.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        {children}
      </body>
    </html>
  );
}
