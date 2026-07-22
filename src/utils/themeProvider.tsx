import { useEffect } from "react";
import { useAppSelector } from "../context/store";

export function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // useSelector "assina" uma fatia do estado do Redux: sempre que
    // state.app.darkMode mudar, este componente re-renderiza automaticamente
    // com o novo valor. O tipo RootState garante autocomplete/checagem.
    const user = useAppSelector(state => state.user);

    useEffect(() => {
        const html = document.documentElement;
        const theme = user?.theme ?? "light";

        html.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [user]);

    return <>{children}</>;
}
