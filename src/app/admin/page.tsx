"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 z-40">
      <div className="text-center w-full">
        <div className="page_loader mx-auto mb-4"></div>
      </div>
    </div>
  );
}
