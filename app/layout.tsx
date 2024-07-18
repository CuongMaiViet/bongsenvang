import type { Metadata } from "next";
import { Noto_Serif, Roboto_Serif } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const fontFamily = Roboto_Serif({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
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
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
