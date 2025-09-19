"use client";
import { NavbarAdmin, ProtectedRoute, SideBar } from "@/components";
import "flag-icons/css/flag-icons.min.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [close, setClose] = useState<boolean>(false);
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin";

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-200">
        {!isLoginPage && (
          <SideBar onToggleSidebar={() => setClose((i) => !i)} hidden={close} />
        )}
        <main
          className={`${
            isLoginPage
              ? "scroll_hidden"
              : `right-0 absolute transition-all ${
                  close ? "w-full" : "w-full md:w-[80%] 2xl:w-[83%]"
                }`
          }`}
        >
          {!isLoginPage && (
            <NavbarAdmin onToggleSidebar={() => setClose((i) => !i)} />
          )}
          <div className={`${!isLoginPage && "p-5"}`}>{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
