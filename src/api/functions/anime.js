import axios from 'axios';
import { sleep } from '../utils/sleepUtil';

/**
 * Get all information for a specific anime.
 * @param {String} malId - MAL id for a given anime.
 */
export async function getAnimeInfo(malId) {
  await sleep();
  if (malId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

/**
 * Get user generated reviews for a specific anime.
 * @param {String} malId - MAL id for a given anime.
 */
export async function getAnimeReviews(malId) {
  await sleep();
  if (malId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/anime/${malId}/reviews`)
    .then((res) => res.data.reviews)
    .catch((error) => console.log(error));
}

/**
 * Get list of recommendations and their weightage made by users for a specific anime.
 * @param {String} malId - MAL id for a given anime.
 */
export async function getAnimeRecommendations(malId) {
  await sleep();
  if (malId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/anime/${malId}/recommendations`)
    .then((res) => res.data.recommendations)
    .catch((error) => console.log(error));
}
/**
 * Get statistical information about scoring for a specific anime.
 * e.g. how many people scored this anime a 10, 9 etc...
 * @param {String} malId - MAL id for a given anime.
 */
export async function getAnimeStats(malId) {
  await sleep();
  if (malId == null) return [];
  return await axios.get(`https://api.jikan.moe/v3/anime/${malId}/stats`)
    .then((res) => res.data.scores)
    .catch((error) => console.log(error));
}