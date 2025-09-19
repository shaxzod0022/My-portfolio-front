"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("token");
}

export function isTokenValid(): boolean {
  if (typeof window === "undefined") return false;

  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      sessionStorage.removeItem("token");
      return false;
    }
    return true;
  } catch {
    sessionStorage.removeItem("token");
    return false;
  }
}

export function getValidToken(): string | null {
  if (isTokenValid()) {
    const token = getToken();
    return token;
  }
  return null;
}

export function getCurrentUserId(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.sub || null;
  } catch {
    return null;
  }
}

export function getCurrentUsername(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.username || null;
  } catch {
    return null;
  }
}

export function getCurrentUserRole(): string | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export function isSuperAdmin(): boolean {
  const role = getCurrentUserRole();
  return role === "super_admin";
}

export function isAdmin(): boolean {
  const role = getCurrentUserRole();
  return role === "admin" || role === "super_admin";
}

export function logout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
    window.location.href = "/admin/login";
  }
}

export function useAuth() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const valid = isTokenValid();

      if (!valid) {
        router.replace("/admin/login");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  return isChecking;
}

export function useRoleAuth() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const valid = isTokenValid();
    if (!valid) {
      router.replace("/admin/login");
    } else {
      const role = getCurrentUserRole();
      setUserRole(role);
      setIsChecking(false);
    }
  }, [router]);

  return { isChecking, userRole };
}
