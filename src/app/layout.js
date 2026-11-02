
import { Suspense } from "react";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";

export const metadata = {
  title: "StudioSpace | Creative Studio Rental",
  description:
    "Discover and book the perfect creative studio for photography, music, podcasting and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
            theme="system"
          />

          <Suspense fallback={<div className="h-20" />}>
            <Navbar />
          </Suspense>

          <main className="flex-grow">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
