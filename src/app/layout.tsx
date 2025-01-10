import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import GlobalState from "@/context";

export const metadata: Metadata = {
  title: "Hospital Food Delivery",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <Toaster />
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
