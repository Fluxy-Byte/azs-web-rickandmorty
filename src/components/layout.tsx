import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/appSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Rick from "@/assets/Rick.png";

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-10 bg-chart-2 md:hidden flex items-center justify-between">
                    <SidebarTrigger className="my-2 mx-4 bg-black text-white shadow-sm hover:bg-chart-2/80" />
                    <img src={Rick} alt="Rick" className="h-14 w-auto mr-4" />
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
