"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Icons from "@/components/icons";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UserNav } from "@/layouts/global/header/auth-nav/user-nav";

export default function AuthNav() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  // const { data: session } = useSession();'
  const session = null;

  return (
    <nav className="flex items-center gap-2">
      {!session ? (
        <>
          <Button variant="outline" className="flex space-x-2 p-0">
            <Link
              href={"/auth/register"}
              className="flex space-x-2 p-3 items-center"
            >
              <span className="login">
                <Icons.register />
              </span>
              <span>Register</span>
            </Link>
          </Button>
          <Button className="p-3">
            <Link
              href={"/auth/login"}
              className="flex space-x-2 p-3 items-center"
            >
              <span className="login">
                <Icons.login />
              </span>
              <span>Login</span>
            </Link>
          </Button>
        </>
      ) : (
        <UserNav />
      )}
      {/* <ThemeToggle /> */}
    </nav>
  );
}
