import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fontFamily = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Bông Sen Vàng",
  description: "Công ty TNHH thuốc bảo vệ thực vật Bông Sen Vàng",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={fontFamily.variable}>
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
