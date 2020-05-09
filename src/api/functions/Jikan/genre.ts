import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

export const GenreIds = {
  ACTION: 1,
  ADVENTURE : 2,
  COMEDY : 4,
  MYSTERY : 5,
  DRAMA : 8,
  FANTASY : 10,
  HORROR : 14,
  MAGIC : 16,
  MARTIAL_ARTS : 17,
  MECHA : 18,
  ROMANCE : 22,
  SCHOOL : 23,
  SPORTS : 30,
  SLICE_OF_LIFE : 36
}

/**
 * Get anime for specific genre
 * @param {Number} genreId - The genre id used to get animes for a specific genre.
 * Properties: genreId
 */
export async function getAnimeInGenre(genreId: Number): Promise<Object[]> {
  await sleep();
  if (genreId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/genre/anime/${genreId}/1`)
    .then((res) => {
      return res.data.anime
    })
    .catch((error) => console.log(error));
}