import React from "react";
import "flag-icons/css/flag-icons.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Quicksand } from "next/font/google";
import Providers from "@/components/helper/Provider";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // kerakli weightlarni belgilang
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={quicksand.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
