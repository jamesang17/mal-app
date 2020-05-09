import axios from 'axios';
import { sleep } from '../../utils/sleepUtil';

const defaultLimit = 10;
const defaultPage = 1;

export class SearchObj {
  query: string;
  limit: Number;
  page: Number;
  constructor(query: string, limit: Number, page: Number) {  
    this.query = query;
    this.limit = limit;
    this.page = page;
  }
}

const searchQuery = (data: SearchObj): string => {
  let limit = data.limit === 0 ? defaultLimit : data.limit;
  let page = data.page === 0 ? defaultPage : data.page;
  return `q=${data.query}&page=${page}&limit=${limit}`;
}

/**
 * Search for a specific anime
 * @param {SearchObj} data - The search object to use to look up an anime.
 * Properties: query, (optional) page, (optional) limit
 */
export async function searchAnime(data: SearchObj): Promise<Object> {
  await sleep();
  if (data == null || data.query == null || data.query.length < 3) return [];
  return await axios.get("https://api.jikan.moe/v3/search/anime?" + searchQuery(data))
    .then((res) => res.data.results)
    .catch((error) => console.log(error));
}

/**
 * Search for a specific character
 * @param {SearchObj} data - The character to look up.
 * Properties: query, (optional) page, (optional) limit
 */
export async function searchCharacter(data: SearchObj): Promise<Object> {
  await sleep();
  if (data == null || data.query == null || data.query.length < 3) return [];
  return await axios.get("https://api.jikan.moe/v3/search/character?" + searchQuery(data))
    .then((res) => res.data.results)
    .catch((error) => console.log(error));
}