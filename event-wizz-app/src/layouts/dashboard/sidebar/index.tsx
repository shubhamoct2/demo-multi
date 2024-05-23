"use client"

import { navItems } from "@/config/nav";
import {DashboardNav} from "../dashboard-nav";
import {cn} from "@/lib/utils";
import {useState, useEffect} from 'react'

export default function Sidebar() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])
    if (loading) {
        return (
            <section className="w-full h-screen relative">
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
                </div>
            </section>
        );
    }


    return (
        <nav
            className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
        >
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="space-y-1">
                        <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                            Menus
                        </h2>
                        <DashboardNav items={navItems}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
