import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

export interface GenreId {
  readonly ACTION: 1;
  readonly ADVENTURE: 2,
  readonly COMEDY: 4,
  readonly MYSTERY: 5,
  readonly DRAMA: 8,
  readonly FANTASY: 10,
  readonly HORROR: 14,
  readonly MAGIC: 16,
  readonly MARTIAL_ARTS: 17,
  readonly MECHA: 18,
  readonly ROMANCE: 22,
  readonly SCHOOL: 23,
  readonly SPORTS: 30,
  readonly SLICE_OF_LIFE: 36
}

/**
 * Get anime for specific genre
 * @param {GenreId} genreId - The genre id used to get animes for a specific genre.
 * Properties: genreId
 */
export async function getAnimeInGenre(genreId: GenreId): Promise<Object[]> {
  await sleep();
  if (genreId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/genre/anime/${genreId}/1`)
    .then((res) => {
      return res.data.anime
    })
    .catch((error) => console.log(error));
}