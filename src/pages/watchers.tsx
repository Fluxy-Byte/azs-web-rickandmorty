import { CircleCheckBig } from "lucide-react";

import { useAllEpisodes } from "../hooks/useEpisodes";
import { useAppSelector } from "../context/store";

import EpisodeGrid from "@/components/episodeGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Watchers() {
    const { data: episodes, isLoading, isError } = useAllEpisodes();
    const watchedIds = useAppSelector((state) => state.movieWatched);

    const watchedEpisodes = episodes.filter((episode) => watchedIds.includes(episode.id));

    return (
        <div className="w-full h-full bg-background p-10 flex flex-col gap-6 overflow-y-auto">
            <div className="flex items-center gap-2">
                <CircleCheckBig className="size-5 text-chart-2" />
                <h2 className="text-lg font-medium">Episódios assistidos</h2>
            </div>

            {isError && <p className="text-sm text-destructive">Erro ao carregar episódios.</p>}

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} className="h-36 rounded-xl" />
                    ))}
                </div>
            ) : watchedEpisodes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    Você ainda não marcou nenhum episódio como assistido.
                </p>
            ) : (
                <EpisodeGrid episodes={watchedEpisodes} />
            )}
        </div>
    )
}
