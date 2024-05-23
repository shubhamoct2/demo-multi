const appUrl =process.env.NEXT_PUBLIC_URL;
export const siteConfig = {
    name: "Event Wizz",
    url: appUrl,
    ogImage: `${appUrl}/og.jpg`,
    description:"Event Planning Software For All Your Event Needs",
    links: {
      twitter: "https://twitter.com/eventwizz",
      github: "https://github.com/eventwizz",
    },
  }
  
  export type SiteConfig = typeof siteConfig


  export const mainNav= [
    {
        title: "",
        href: "/",
        disabled: false,
        external: false,
        icon: "",
        type: "link",
        style: "transition-colors hover:text-foreground/80",
        label: "",
    },
//    {
//        title: "Events",
//        href: "events",
//        disabled: false,
//        external: false,
//        icon: "",
//        type: "link",
//        style: "transition-colors hover:text-foreground/80",
//        label: "Events",
//    },
//    {
//        title: "Venues",
//        href: "venues",
//        disabled: false,
//        external: false,
//        icon: "",
//        type: "link",
//        style: "transition-colors hover:text-foreground/80",
//        label: "Venues",
//    },
//    {
//        title: "Resourse",
//        href: "resourse",
//        disabled: false,
//        external: false,
//        icon: "",
//        type: "link",
//        style: "transition-colors hover:text-foreground/80",
//        label: "Resourse",
//    },
//    {
//        title: "Login",
//        href: "/auth/login",
//        disabled: false,
//        external: false,
//        icon: "",
//        type: "button",
//        style: "transition-colors hover:text-foreground/80",
//        label: "Login",
//    },
]
