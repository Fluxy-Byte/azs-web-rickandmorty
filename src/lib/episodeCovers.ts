import Episodio1 from "@/assets/episodio1.jpg";
import Episodio2 from "@/assets/episodio2.jpg";
import Episodio3 from "@/assets/episodio3.jpg";
import Episodio4 from "@/assets/episodio4.jpg";
import Episodio5 from "@/assets/episodio5.jpg";
import Episodio6 from "@/assets/episodio6.jpg";
import Episodio7 from "@/assets/episodio7.jpg";
import Episodio8 from "@/assets/episodio8.jpg";
import Episodio9 from "@/assets/episodio9.jpg";
import Episodio10 from "@/assets/episodio10.jpg";

const episodeCovers = [
    Episodio1,
    Episodio2,
    Episodio3,
    Episodio4,
    Episodio5,
    Episodio6,
    Episodio7,
    Episodio8,
    Episodio9,
    Episodio10,
];

// Distribui as 10 capas ciclicamente entre todos os episódios: o 1 pega a
// primeira capa, o 10 pega a última e o 11 volta para a primeira, e assim
// sucessivamente até o último episódio.
export function getEpisodeCover(episodeId: string) {
    const index = Number(episodeId) - 1;
    const position = ((index % episodeCovers.length) + episodeCovers.length) % episodeCovers.length;
    return episodeCovers[position];
}
