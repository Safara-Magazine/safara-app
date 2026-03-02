import type { Metadata } from "next";
import "@/styles/globals.css";
import { Afacad } from "next/font/google";
import RootLayoutContent from "@/components/RootLayoutContent";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const afacad = Afacad({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safara Frontend App",
  description: "Tourism and Travel ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${afacad.className} antialiased overflow-x-hidden`}>
        <RootLayoutContent>
          <TooltipProvider>{children}</TooltipProvider>
        </RootLayoutContent>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
