import type { Metadata } from "next";
import "@/styles/globals.css";
import { Afacad } from "next/font/google";
import Footer from "@/components/component.footer";
import Providers from "@/query/query.providers";
import GlobalLoader from "@/components/global-loader";

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
        
        
        {typeof window !== 'undefined' && <GlobalLoader />}
       <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
