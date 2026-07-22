import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useAllEpisodes, useEpisodesByPage, useQuantityEpisodes } from "../hooks/useEpisodes";
import Capa from "../assets/capa2.jpg";

import EpisodeGrid from "@/components/episodeGrid";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const SEARCH_PAGE_SIZE = 20;

export default function Movies() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const hasSearch = search.trim().length > 0;

    const { data: pagesInfo } = useQuantityEpisodes();
    const serverTotalPages = pagesInfo?.pages ?? 1;

    // Sem filtro: consulta só a página atual na API.
    const {
        data: pageEpisodes,
        isLoading: isLoadingPage,
        isError: isErrorPage,
    } = useEpisodesByPage(String(page), !hasSearch);

    // Com filtro: precisa considerar episódios de todas as páginas.
    const {
        data: allEpisodes,
        isLoading: isLoadingAll,
        isError: isErrorAll,
    } = useAllEpisodes(hasSearch);

    const searchResults = useMemo(() => {
        if (!hasSearch) return [];
        const term = search.trim().toLowerCase();
        return allEpisodes.filter((episode) => episode.name.toLowerCase().includes(term));
    }, [allEpisodes, search, hasSearch]);

    const totalPages = hasSearch
        ? Math.max(1, Math.ceil(searchResults.length / SEARCH_PAGE_SIZE))
        : serverTotalPages;

    const currentPage = Math.min(page, totalPages);

    const displayedEpisodes = hasSearch
        ? searchResults.slice((currentPage - 1) * SEARCH_PAGE_SIZE, currentPage * SEARCH_PAGE_SIZE)
        : (pageEpisodes ?? []);

    const isLoading = hasSearch ? isLoadingAll : isLoadingPage;
    const isError = hasSearch ? isErrorAll : isErrorPage;

    const headingCount = hasSearch ? searchResults.length : (pagesInfo?.count ?? 0);

    function handleSearchChange(value: string) {
        setSearch(value);
        setPage(1);
    }

    return (
        <div className="w-full h-full bg-background p-10 flex flex-col gap-6 overflow-y-auto">
            <div className="relative w-full h-[38vw] min-h-48 max-h-96 shrink-0 rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover" src={Capa} alt="Capa Rick And Morty" />
                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-black/50 via-black/25 to-transparent" />
            </div>

            <div className="w-full flex-1 min-h-0 flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-medium">Encontramos {headingCount} episódios</h2>
                    <div className="relative w-full sm:w-72">
                        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Buscar episódio pelo nome..."
                            className="pl-8"
                        />
                    </div>
                </div>

                {isError && (
                    <p className="text-sm text-destructive">Erro ao carregar episódios.</p>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} className="h-36 rounded-xl" />
                        ))}
                    </div>
                ) : displayedEpisodes.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Nenhum episódio encontrado para "{search}".
                    </p>
                ) : (
                    <EpisodeGrid episodes={displayedEpisodes} />
                )}

                {!isLoading && totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage((p) => Math.max(1, p - 1));
                                    }}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        href="#"
                                        isActive={p === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(p);
                                        }}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage((p) => Math.min(totalPages, p + 1));
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    )
}
