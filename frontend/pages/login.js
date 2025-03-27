import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-gray-900 shadow-2xl">
        <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <input name="username" placeholder="Enter username" required className="w-full rounded-md border p-3 shadow-md" />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input name="password" type="password" placeholder="Enter password" required className="w-full rounded-md border p-3 shadow-md" />
          </div>

          <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold hover:scale-105 hover:shadow-lg transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
