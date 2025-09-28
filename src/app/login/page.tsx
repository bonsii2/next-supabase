import LoginForm from "@/app/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-green-900 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
        <Link href={'/register'}>signup</Link>
      </div>
    </main>
  );
}

