import { searchAnime, searchManga, searchCharacter, SearchObj } from './functions/Jikan/search';
import { topAnime, topManga, AnimeTopTypes, MangaTopTypes } from './functions/Jikan/top';
import { getAnimeInGenre, GenreId } from './functions/Jikan/genre';
import { getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats } from './functions/Jikan/anime';
import { Anime } from './models/Anime';

export { 
  searchAnime, searchManga, searchCharacter,
  topAnime, topManga, AnimeTopTypes, MangaTopTypes, SearchObj,
  getAnimeInGenre, GenreId,
  getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
  Anime
};