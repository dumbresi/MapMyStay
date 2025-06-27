// app/components/Navbar.tsx
"use client";

export default function Navbar() {
  return (
    <div className="w-full px-6 py-4 border-b shadow-sm flex items-center justify-between">
      <h1 className="text-2xl font-bold text-red-500 tracking-tight">MapMyStay</h1>
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <button className="hover:underline">Become a host</button>
        <button className="hover:underline">Help</button>
        <button className="hover:underline">Login</button>
      </div>
    </div>
  );
}
