"use client";

import Header from "@/components/Header";
import { Authenticated } from "convex/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="flex h-screen">
    <Authenticated>
        <h1>Sidebar</h1>
        {/* <Sidebar /> */}
    </Authenticated>

    <div className="flex-1">
        <Header />
    <main className="bg-red-500 flex-1">{children}</main>
    </div>
    </div>
  );
}
