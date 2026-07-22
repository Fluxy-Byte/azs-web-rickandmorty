import { Outlet } from "react-router-dom";

import AppSidebar from "@/components/appSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarTrigger className="m-2 md:hidden bg-chart-2 text-black shadow-sm hover:bg-chart-2/80" />
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}
