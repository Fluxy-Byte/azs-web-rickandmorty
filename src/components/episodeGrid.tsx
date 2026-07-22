import type { Episode } from "@/lib/axios";
import EpisodeCard from "@/components/episodeCard";

interface EpisodeGridProps {
    episodes: Episode[];
}

export default function EpisodeGrid({ episodes }: EpisodeGridProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </div>
    );
}
