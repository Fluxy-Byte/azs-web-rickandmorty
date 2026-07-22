import { Link, useLocation } from "react-router-dom";
import { House, Clapperboard, Star, CircleCheckBig, Lightbulb } from "lucide-react";

import Logo from "../assets/Logo.png";
import Rick from "../assets/Rick.png";

import ToggleTheme from "@/components/toggleTheme";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Item {
    href: string;
    label: string;
    icon: React.ReactNode;
}

const itensMenu: Item[] = [
    {
        href: "/",
        label: "Início",
        icon: <House size={64} />,
    },
    {
        href: "/movies",
        label: "Episódios",
        icon: <Clapperboard size={64} />,
    },
    {
        href: "/favorites",
        label: "Favoritos",
        icon: <Star size={64} />,
    },
    {
        href: "/watchers",
        label: "Assistidos",
        icon: <CircleCheckBig size={64} />,
    }
]

export default function AppSidebar() {
    const { pathname } = useLocation();

    return (
        <Sidebar>
            <SidebarHeader className="items-center py-2!">
                <img src={Logo} alt="Logo" className="w-full p-2" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="p-2 flex flex-col gap-2">
                            {itensMenu.map((i) => (
                                <SidebarMenuItem key={i.label}>
                                    <SidebarMenuButton
                                        render={<Link to={i.href} />}
                                        isActive={pathname === i.href}
                                        tooltip={i.label}
                                        className="font-light flex gap-4"
                                    >
                                        <span>
                                            {i.icon}
                                        </span>
                                        {i.label}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="w-full h-auto items-center gap-2 p-6!">
                <img src={Rick} alt="Rick" className="w-1/2" />
                <div className="w-auto h-auto bg-card-foreground/80 border border-border/60 p-4! rounded-md text-center flex justify-baseline items-center">
                    <Lightbulb size={48} className="text-chart-2" />
                    <p className="text-sm">Assista nossos episodios de forma gratuita e facil.</p>
                </div>
                {/* <ToggleTheme /> */}
            </SidebarFooter>
        </Sidebar>
    )
}
