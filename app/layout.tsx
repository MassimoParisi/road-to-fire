import { cn } from "@/lib/utils";
import { satoshi } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Road To F.I.R.E. 🔥",
  description: "Financial Independence & Early Retirement | Calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(satoshi.variable)}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
