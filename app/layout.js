import "./css/style.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "11.7A.10 Kelompok 3",
  description: "Unversitas Nusa Mandiri Kelas 11.7A.10",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            <main className="grow"> {children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
