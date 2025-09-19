"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      router.replace("/admin/login");
    } else {
      setIsAuthorized(false);
    }
  }, [router]);

  if (isAuthorized)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="page_loader"></span>
      </div>
    );

  return <>{children}</>;
}
