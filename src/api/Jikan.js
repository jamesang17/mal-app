import { searchAnime, searchCharacter, SearchObj } from './functions/Jikan/search';
import { topAnime, AnimeTopTypes } from './functions/Jikan/top';
import { getAnimeInGenre, GenreIds } from './functions/Jikan/genre';
import { getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats } from './functions/Jikan/anime';
import { Anime } from './models/Anime';

export { 
  searchAnime, searchCharacter,
  topAnime, AnimeTopTypes, SearchObj,
  getAnimeInGenre, GenreIds,
  getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
  Anime
};