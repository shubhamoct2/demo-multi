"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"


import {cn} from "@/lib/utils"
import {siteConfig, mainNav} from "@/config/site"
import Icons from "@/components/icons"


export default function MainNav() {
    const pathname = usePathname()

    return (
        <>
            <Link href="/" className="mr-6 flex items-center space-x-2">
                <Icons.logo className="h-6 w-6"/>
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                {mainNav && mainNav.map((menu, index) => {
                    return (
                        <Link
                            key={index}
                            href={menu?.href}
                            className={cn(
                                menu?.style,
                                pathname === menu?.href ? "text-foreground" : "text-foreground/60",
                            )}
                        >
                            <span>
                                {menu?.icon && (
                                    <Icons.gitHub/>
                                )}
                            </span>
                            <span>
                                {menu?.title}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        </>
    )
}
