
import type { ReactNode } from "react";

export const metadata = {
  title: "TOBY 時間大作戰",
  description: "每日打卡作息表得點數",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
