import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchEpisodes, fetchEpisodesByPage } from "../api/episodes";

export function useQuantityEpisodes() {
    return useQuery({
        queryKey: ["episodes"],
        queryFn: fetchEpisodes,
        staleTime: 1000 * 60, // 1 minuto
    });
}

export function useEpisodesByPage(page: string, enabled: boolean = true) {
    return useQuery({
        queryKey: ["episodes", page],
        queryFn: () => fetchEpisodesByPage(page),
        staleTime: 1000 * 60, // 1 minuto
        enabled,
    });
}

// Busca todas as páginas de episódios (o dataset é pequeno, ~51 episódios / 3
// páginas), permitindo filtro e paginação no cliente para favoritos/assistidos
// e para a busca por nome (que precisa considerar episódios de todas as páginas).
// `enabled` evita disparar as buscas quando elas não são necessárias no momento.
export function useAllEpisodes(enabled: boolean = true) {
    const { data: pagesInfo, isLoading: isLoadingPages } = useQuantityEpisodes();
    const totalPages = pagesInfo?.pages ?? 0;

    const pageQueries = useQueries({
        queries: Array.from({ length: totalPages }, (_, index) => {
            const page = String(index + 1);
            return {
                queryKey: ["episodes", page],
                queryFn: () => fetchEpisodesByPage(page),
                staleTime: 1000 * 60,
                enabled,
            };
        }),
    });

    const isLoading = enabled && (isLoadingPages || pageQueries.some((query) => query.isLoading));
    const isError = pageQueries.some((query) => query.isError);

    const data = pageQueries
        .flatMap((query) => query.data ?? [])
        .sort((a, b) => Number(a.id) - Number(b.id));

    return { data, isLoading, isError };
}