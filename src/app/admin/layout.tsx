import { AdminLayout } from "@/components";
import "../globals.css";
import "flag-icons/css/flag-icons.min.css";
import "boxicons/css/boxicons.min.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shakhzod's panel",
  description: "Shakhzod's Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
