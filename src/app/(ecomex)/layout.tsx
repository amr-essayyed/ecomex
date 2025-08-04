import { Header } from "@/components/Header";
import React from "react";

export default async function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="mx-auto w-full max-w-7xl">
            {/* Header */}
            <Header />
            {/* Content */}
            <div className="px-4 py-2">
                {children}
            </div>
        </div>
    )
}