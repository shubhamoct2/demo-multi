import MainNav from "@/layouts/global/header/main-nav";
import {MobileNav} from "@/layouts/global/header/mobile-nav";
import AuthNav from "@/layouts/global/header/auth-nav";

export default function Header(headerProps: any): JSX.Element {

    return (
        <header
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container">
                <section className=" flex h-16 max-w-screen-2xl items-center justify-between">
                    <MainNav/>
                    <MobileNav/>
                    <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <AuthNav/>
                    </div>
                </section>
            </div>
        </header>
    )
}
