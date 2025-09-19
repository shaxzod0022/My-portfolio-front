import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Footer, Navbar } from "@/components";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Shakhzod Ilgeldiyev - Web Developer",
  description:
    "Professional web developer portfolio. Modern, responsive and user-friendly websites.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        {children}
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
