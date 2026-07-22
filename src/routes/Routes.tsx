import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";
import Movies from "@/pages/movies";
import Watchers from "@/pages/watchers";
import Favorites from "@/pages/favorites";
import Inicio from "@/pages/incio"

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Inicio />,
            },
            {
                path: "/movies",
                element: <Movies />,
            },
            {
                path: "/favorites",
                element: <Favorites />,
            },
            {
                path: "/watchers",
                element: <Watchers />,
            }
        ]
    }
]);
