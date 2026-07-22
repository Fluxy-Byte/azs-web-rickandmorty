import { getPagesOfTheEpisodes, getEpisodesByPage } from "../lib/axios";

export async function fetchEpisodes() {
    const result = await getPagesOfTheEpisodes();
    return result;
}

export async function fetchEpisodesByPage(page: string) {
    const result = await getEpisodesByPage(page);
    return result;
}