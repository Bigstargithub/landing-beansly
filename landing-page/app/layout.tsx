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
  title: "빈즐리 - 매일 마시는 커피, 이제 더 쉽게 찾아보세요",
  description: "빈즐리에서 취향에 딱 맞는 원두를 집 앞까지 배송해드립니다. 간단한 추천으로 나만의 완벽한 커피를 만나보세요.",
  keywords: ["빈즐리", "Beansly", "커피", "원두", "커피 추천", "원두 배송", "커피 구독"],
  openGraph: {
    title: "빈즐리 - 원두, 이제 쉽게",
    description: "취향에 딱 맞는 원두를 집 앞까지 배송해드립니다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
