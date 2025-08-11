import type { Metadata } from "next";
import { Raleway, Fira_Code, Outfit } from "next/font/google";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import CustomCursor from "@/components/CustomCursor";

import "./globals.css";

// Define the fonts your application will use
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });
const fireCode = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-firacode",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

// This logic is for handling the base path on GitHub Pages
const isGithubActions = process.env.NODE_ENV === 'production';
const repo = 'portfolio';
const basePath = isGithubActions ? `/${repo}` : '';

export const metadata: Metadata = {
  title: "Rahul Raj | Portfolio",
  description: "A portfolio of impact",
  icons: {
    icon: `${basePath}/favicon.svg`, // Your favicon path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${fireCode.variable} ${outfit.variable} antialiased`}
      >
        {/* These components will now appear on every page of your site */}
        <CustomCursor />
        <Navbar />
        
        {/* 'children' will be your actual page content (e.g., homepage or a blog post) */}
        {children}
        
        <Footer />
      </body>
    </html>
  );
}