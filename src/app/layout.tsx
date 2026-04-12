import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "useGemmaLLM",
  description: "自宅のLinuxでGemmaLLMを動かしています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
