import { Calendar, CircleCheckBig, Star, Users } from "lucide-react";

import type { Episode } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/context/store";
import { addMovieFavorite, removeMovieFavorite } from "@/context/slices/movieFavoritedSlice";
import { addMovieWatched, removeMovieWatched } from "@/context/slices/movieWatchedSlice";
import { cn } from "@/lib/utils";
import { getEpisodeCover } from "@/lib/episodeCovers";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const statusStyles: Record<string, string> = {
    Alive: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
    Dead: "border-destructive/40 bg-destructive/10 text-destructive",
    unknown: "border-border bg-muted text-muted-foreground",
};

interface EpisodeCardProps {
    episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.movieFavorite);
    const watched = useAppSelector((state) => state.movieWatched);

    const isFavorite = favorites.includes(episode.id);
    const isWatched = watched.includes(episode.id);

    function toggleFavorite() {
        if (isFavorite) dispatch(removeMovieFavorite(episode.id));
        else dispatch(addMovieFavorite(episode.id));
    }

    function toggleWatched() {
        if (isWatched) dispatch(removeMovieWatched(episode.id));
        else dispatch(addMovieWatched(episode.id));
    }

    const cover = getEpisodeCover(episode.id);

    return (
        <Dialog>
            <DialogTrigger
                className="group flex w-full cursor-pointer flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
                <div className="-mx-4 -mt-4 aspect-video w-[calc(100%+2rem)] shrink-0 overflow-hidden rounded-t-xl">
                    <img
                        src={cover}
                        alt={episode.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline">{episode.episode}</Badge>
                    <div className="flex items-center gap-1.5">
                        {isFavorite && <Star className="size-4 fill-amber-400 text-amber-400" />}
                        {isWatched && <CircleCheckBig className="size-4 text-chart-2" />}
                    </div>
                </div>

                <h3 className="line-clamp-2 font-medium text-foreground">{episode.name}</h3>

                <div className="mt-auto flex flex-col gap-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 shrink-0" />
                        <span className="truncate">{episode.air_date}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users className="size-3.5 shrink-0" />
                        {episode.characters.length} personagens
                    </span>
                </div>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] w-full overflow-y-auto sm:max-w-2xl lg:max-w-3xl">
                <div className="relative -mx-4 -mt-4 h-40 w-[calc(100%+2rem)] shrink-0 overflow-hidden rounded-t-xl sm:h-48">
                    <img src={cover} alt={episode.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
                </div>

                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{episode.episode}</Badge>
                        <DialogTitle>{episode.name}</DialogTitle>
                    </div>
                    <DialogDescription className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" /> Exibido em {episode.air_date}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={isFavorite ? "default" : "outline"}
                        size="sm"
                        onClick={toggleFavorite}
                    >
                        <Star data-icon="inline-start" className={isFavorite ? "fill-current" : ""} />
                        {isFavorite ? "Favoritado" : "Favoritar"}
                    </Button>
                    <Button
                        variant={isWatched ? "default" : "outline"}
                        size="sm"
                        onClick={toggleWatched}
                    >
                        <CircleCheckBig data-icon="inline-start" />
                        {isWatched ? "Assistido" : "Marcar como assistido"}
                    </Button>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                        Personagens ({episode.characters.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {episode.characters.map((character) => (
                            <div
                                key={character.id}
                                className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-2"
                            >
                                <Avatar size="lg">
                                    <AvatarImage src={character.image} alt={character.name} />
                                    <AvatarFallback>{character.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <span className="truncate text-sm font-medium">{character.name}</span>
                                    <span className="text-xs text-muted-foreground">{character.species}</span>
                                    <Badge
                                        variant="outline"
                                        className={cn("w-fit", statusStyles[character.status] ?? statusStyles.unknown)}
                                    >
                                        {character.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
