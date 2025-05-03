"use client";
import { M_PLUS_1p } from "next/font/google";
import "./globals.css";

import { ReactNode } from "react";
import { useWindowSize } from "../../hooks/GetWindowSize"; // フックをインポート
import Head from "next/head";

const m_PLUS_1p = M_PLUS_1p({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { height, width } = useWindowSize();

  return (
    <html lang="ja">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body className={m_PLUS_1p.className}>
        <main>
          <section>
            <div
              className={`flex flex-col min-h-screen h-[${height}px] w-[${width}px]`}
            >
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}