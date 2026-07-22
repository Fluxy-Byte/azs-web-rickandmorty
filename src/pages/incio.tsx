import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

import { useAllEpisodes, useEpisodesByPage } from "../hooks/useEpisodes";
import { useAppSelector } from "../context/store";
import Capa from "../assets/Capa5.png";

import EpisodeGrid from "@/components/episodeGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Inicio() {
  const {
    data: episodes,
    isLoading: isLoadingEpisodes,
    isError: isErrorEpisodes,
    error: episodesError,
  } = useEpisodesByPage("1");

  const favoriteIds = useAppSelector((state) => state.movieFavorite);
  const { data: allEpisodes, isLoading: isLoadingFavorites } = useAllEpisodes();
  const favoriteEpisodes = allEpisodes.filter((episode) => favoriteIds.includes(episode.id));
  const favoritePreview = favoriteEpisodes.slice(0, 5);

  const preview = episodes?.slice(0, 10) ?? [];

  return (
    <div className="w-full h-full bg-background p-10 flex flex-col gap-6 overflow-y-auto">
      <div className="relative w-full h-[38vw] min-h-48 max-h-96 shrink-0 rounded-xl overflow-hidden">
        <img className="w-full h-full object-cover" src={Capa} alt="Capa Rick And Morty" />
        <div className="absolute inset-0 rounded-xl bg-linear-to-r from-black/50 via-black/25 to-transparent" />
      </div>

      {favoriteIds.length > 0 && (
        <div className="flex w-full shrink-0 flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Star className="size-5 fill-amber-400 text-amber-400" />
              <h2 className="text-lg font-medium">Seus favoritos</h2>
            </div>
            <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/favorites" />}>
              Ver todos os favoritos
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          {isLoadingFavorites ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : (
            <EpisodeGrid episodes={favoritePreview} />
          )}
        </div>
      )}

      <div className="w-full flex-1 min-h-0 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-medium">Episódios em destaque</h2>
          <Button variant="outline" size="sm" nativeButton={false} render={<Link to="/movies" />}>
            Ver todos
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>

        {isErrorEpisodes && (
          <p className="text-sm text-destructive">
            Erro ao carregar episódios: {String(episodesError)}
          </p>
        )}

        {isLoadingEpisodes ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-36 rounded-xl" />
            ))}
          </div>
        ) : (
          <EpisodeGrid episodes={preview} />
        )}
      </div>
    </div>
  )
}
