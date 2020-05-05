import { searchAnime, searchManga, searchCharacter, SearchObj } from './functions/search';
import { topAnime, topManga, AnimeTopTypes, MangaTopTypes } from './functions/top';
import { getAnimeInGenre, getMangaInGenre, GenreIds, GenreObj } from './functions/genre';
import { getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats } from './functions/anime';
import { Anime } from './models/Anime';

export { 
  searchAnime, searchManga, searchCharacter,
  topAnime, topManga, AnimeTopTypes, MangaTopTypes, SearchObj,
  getAnimeInGenre, getMangaInGenre, GenreIds, GenreObj,
  getAnimeInfo, getAnimeRecommendations, getAnimeReviews, getAnimeStats,
  Anime
};