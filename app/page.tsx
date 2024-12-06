"use client";

import { useEffect, useState } from "react";
import { addGuest } from "./api/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telp, setTelp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // Dynamically import LocomotiveScroll and initialize it
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  const router = useRouter();

  async function handleSubmit() {
    try {
      const formdata = new FormData();
      if (name) formdata.append("name", name);
      if (email) formdata.append("email", email);
      if (telp) formdata.append("telp", telp);

      const result = await addGuest(formdata);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
      }
    } catch (err) {
      console.log("this is error: " + err);
      toast.error("Something went wrong");
    } finally {
      setName("");
      setEmail("");
      setTelp("");
    }
  }

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-100 px-4"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Buku Tamu
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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="telp"
                className="block text-sm font-medium text-gray-700"
              >
                Telepon
              </label>
              <input
                id="telp"
                type="tel"
                placeholder="Telepon"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Kirim
              </button>
            </div>
          </form>
          <button
            onClick={() => router.push("/admin")}
            className="mt-4 w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}
