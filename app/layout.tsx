import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ['400','500','600','700']
});


export const metadata: Metadata = {
  title: "Grainly",
  description: "Animated grainy icons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", bricolage.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-[#F3F3F2]/30 flex flex-col max-w-200 mx-auto pb-20 px-4">
        <Navbar/>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
