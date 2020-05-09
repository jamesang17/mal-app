import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

export interface AnimeTopTypes {
  readonly AIRING: "airing",
  readonly UPCOMING: "upcoming",
  readonly MOVIE: "movie",
  readonly OVA: "ova",
  readonly BYPOPULARITY: "bypopularity",
  readonly FAVORITE: "favorite"
}

/**
 * Gets top animes for a given anime top type.
 * @param {AnimeTopTypes} data - the top type for anime
 */
export async function topAnime(data: AnimeTopTypes): Promise<Object[]> {
  await sleep();
  let type = data == null ? "airing" : data;
  return await axios.get(`https://api.jikan.moe/v3/top/anime/1/${type}`)
    .then((res) => res.data.top)
    .catch((error) => console.log(error));
}
