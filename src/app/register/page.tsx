"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  // Create supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const router = useRouter();

  // State variables
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Call Supabase signUp
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: formData.get("full_name"), // 👈 extra metadata
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Redirect or show message
    router.push("/invoices"); // or /login if email confirmation is required
  }

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 max-w-md mx-auto p-4 border rounded"
    >
      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        minLength={6}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
