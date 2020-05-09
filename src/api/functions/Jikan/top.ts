import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

export const AnimeTopTypes = { 
  AIRING: "airing",
  UPCOMING: "upcoming",
  MOVIE: "movie",
  OVA: "ova",
  BYPOPULARITY: "bypopularity",
  FAVORITE: "favorite"
}

/**
 * Gets top animes for a given anime top type.
 * @param {string} data - the top type for anime
 */
export async function topAnime(data: string): Promise<Object[]> {
  await sleep();
  let type = data == null ? "airing" : data;
  return await axios.get(`https://api.jikan.moe/v3/top/anime/1/${type}`)
    .then((res) => res.data.top)
    .catch((error) => console.log(error));
}
