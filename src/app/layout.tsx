import type { Metadata } from "next";
import "@/styles/globals.css";
import { Afacad } from "next/font/google";
import Footer from "@/components/component.footer";


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
        {children}
        <Footer />
      </body>
    </html>
  );
}
