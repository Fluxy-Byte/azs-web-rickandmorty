import axios from "axios";

const GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

export interface Pages {
    count: number
    pages: number
}

interface ResGetPages {
    data: {
        episodes: {
            info: {
                count: number,
                pages: number
            }
        }
    }
}

export interface Character {
    id: string,
    name: string,
    image: string,
    species: string,
    status: string
}

export interface Episode {
    id: string,
    name: string,
    air_date: string,
    episode: string,
    characters: Character[]
}

interface ResGetEpisodies {
    data: {
        episodes: {
            results: Episode[]
        }
    }
}

export async function getPagesOfTheEpisodes(): Promise<Pages> {
    try {
        const query = `
        query {
            episodes {
                info {
                    count
                    pages
                }
            }
        }`

        const { data } = await axios.post(
            GRAPHQL_URL,
            { query },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const res: ResGetPages = data;

        return {
            count: res.data.episodes.info.count,
            pages: res.data.episodes.info.pages,
        }

    } catch (e: any) {
        console.log(e);
        return {
            count: 0,
            pages: 0
        }
    }
}

export async function getEpisodesByPage(page: string): Promise<Episode[]> {
    try {
        const query = `
         query {
   episodes(page: ${page}){
    results{
    id,
    name,
      air_date,
      episode,
      characters {
        id,
        name,
        image,
        species,
        status
      }
    }
	}
}`

        const { data } = await axios.post(
            GRAPHQL_URL,
            { query },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const res: ResGetEpisodies = data;

        return res.data.episodes.results

    } catch (e: any) {
        console.log(e);
        return []
    }
}