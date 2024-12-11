"use client";

import { deleteSession } from "../lib/auth";
import { GuestProps } from "../lib/types";
import { useRouter } from "next/navigation";

interface uiProps {
  dataGuest: GuestProps[] | undefined;
}

export default function Ui({ dataGuest }: uiProps) {

  const router = useRouter()
  return (
    <>
    <div className="fixed flex justify-end top-0 bg-slate-200 w-full px-5 py-2">
      <button onClick={async() => {
        await deleteSession()
        router.push('/login')
      }} className="bg-white px-2 py-1 rounded-xl hover:bg-slate-100">
        logout
      </button>
    </div>
    <div className="min-h-screen bg-gray-100 py-14 px-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Daftar Tamu
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {dataGuest !== undefined &&
          dataGuest.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-500 text-sm font-medium mb-2">
                Guest #{index + 1}
              </p>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mb-1">Email: {item.email}</p>
              <p className="text-gray-600 text-sm">Telepon: {item.telp}</p>
            </div>
          ))}
      </div>
    </div>
    </>
  );
}
