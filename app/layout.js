import { Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// 配置 Noto Serif JP 字体 (用于标题和正文)
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false, // 避免某些环境下的加载问题
});

// 配置 JetBrains Mono 字体 (用于代码风格的小字)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "Li Yongze | Portfolio",
  description: "Digital Designer & Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} ${jetbrainsMono.variable} font-serif antialiased`}>
        {children}
      </body>
    </html>
  );
}