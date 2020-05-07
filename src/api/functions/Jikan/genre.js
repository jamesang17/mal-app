import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

export const GenreIds = {
  ACTION: 1,
  ADVENTURE: 2,
  COMEDY: 4,
  MYSTERY: 5,
  DRAMA: 8,
  FANTASY: 10,
  HORROR: 14,
  MAGIC: 16,
  MARTIAL_ARTS: 17,
  MECHA: 18,
  ROMANCE: 22,
  SCHOOL: 23,
  SPORTS: 30,
  SLICE_OF_LIFE: 36
}

export function GenreObj(genreId) {
  this.genreId = genreId;
}

/**
 * Get anime for specific genre
 * @param {GenreObj} data - The genre object used to get animes for a specific genre.
 * Properties: genreId
 */
export async function getAnimeInGenre(genreId) {
  await sleep();
  if (genreId == null) return [];
  console.log("No null return.")
  return await axios.get(`https://api.jikan.moe/v3/genre/anime/${genreId}/1`)
    .then((res) => {
      console.log(res.data.anime)
      return res.data.anime
    })
    .catch((error) => console.log(error));
    
}

/**
 * Get manga for specific genre
 * @param {GenreObj} data - The genre object used to get mangas for a specific genre.
 * Properties: genreId
 */
export async function getMangaInGenre(genreId) {
  await sleep();
  if (genreId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/genre/manga/${genreId}/1`)
    .then((res) => res.data.manga)
    .catch((error) => console.log(error));
}