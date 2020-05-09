import { searchAnime, searchManga, searchCharacter, SearchObj } from './functions/Jikan/search';
import { topAnime, topManga, AnimeTopTypes, MangaTopTypes } from './functions/Jikan/top';
import { getAnimeInGenre, GenreIds } from './functions/Jikan/genre';
import { getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats } from './functions/Jikan/anime';
import { Anime } from './models/Anime';

export { 
  searchAnime, searchManga, searchCharacter,
  topAnime, topManga, AnimeTopTypes, MangaTopTypes, SearchObj,
  getAnimeInGenre, GenreIds,
  getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
  Anime
};