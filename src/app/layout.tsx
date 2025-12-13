import type { Metadata } from "next";
import "@/styles/globals.css";
import { Afacad } from "next/font/google";
import RootLayoutContent from "@/components/RootLayoutContent";

const afacad = Afacad({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safara Front-end App",
  description: "Tourism and Travel ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${afacad.className}  antialiased `}>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
