"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "../components/AuthModal";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // If buyer is already logged in, redirect home
    try {
      const session = localStorage.getItem("nova_buyer_session");
      if (session) {
        router.push("/");
      }
    } catch {}
  }, [router]);

  return (
    <div className="min-h-screen bg-[#070319] text-white flex items-center justify-center">
      <AuthModal
        isOpen={true}
        onClose={() => router.push("/")}
        initialMode="login"
      />
    </div>
  );
}
