"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createSession } from "../lib/auth";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const router = useRouter();

  async function handleSubmit() {
    try {
      if (email === 'museadmin@gmail.com' && password === 'museadmin') {
        await createSession({email, password})
        toast.success('welcome back, admin')
        router.push('/admin')
      }
    } catch (err) {
      console.log('this is error: '+err)
      toast.error('something wrong')
    }
  }

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 px-4"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Login Admin
          </h1>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
