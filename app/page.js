"use client";

import { UserButton, useUser, SignIn, SignOutButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../convex/_generated/api";
import FloatingBackground from "../components/floating-background"
import Navbar from "../components/navbar"
import Hero from "../components/hero"

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure component is only used on the client
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && user) {
      checkUser();
    }
  }, [isHydrated, user]); // Run only when hydrated

  const checkUser = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    try {
      const result = await createUser({
        username: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        imageurl: user.imageUrl,
        upgrade:false
      });
      console.log("User created:", result);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (!isHydrated) return null; // Avoid SSR mismatch

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="absolute  inset-0 bg-gradient-to-tl from-blue-500/30 via-violet-500/30 to-emerald-500/30 animate-gradient"></div>
      <FloatingBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
