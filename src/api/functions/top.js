import axios from 'axios';
import { sleep } from '../utils/sleepUtil';

export const AnimeTopTypes = {
  AIRING: "airing",
  UPCOMING: "upcoming",
  MOVIE: "movie",
  OVA: "ova",
  BYPOPULARITY: "bypopularity",
  FAVORITE: "favorite"
}

export const MangaTopTypes = {
  MANGA: "manga",
  NOVELS: "novels",
  BYPOPULARITY: "bypopularity",
  FAVORITE: "favorite"
}

/**
 * Gets top animes for a given anime top type.
 * @param {AnimeTopTypes} data - the top type for anime
 */
export async function topAnime(data) {
  await sleep();
  let type = data == null ? "airing" : data;
  return await axios.get(`https://api.jikan.moe/v3/top/anime/${type}`)
    .then((res) => console.log(res.data.top))
    .catch((error) => console.log(error));
}

/**
 * Gets top mangas for a given manga top type.
 * @param {MangaTopTypes} data - the top type for manga
 */
export async function topManga(data) {
  await sleep();
  let type = data == null ? "manga" : data.type;
  return await axios.get(`https://api.jikan.moe/v3/top/manga/${type}`)
    .then((res) => res.data.results)
    .catch((error) => console.log(error));
}