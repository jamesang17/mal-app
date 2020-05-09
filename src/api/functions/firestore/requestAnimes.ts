import firebase from '../../../firebase';
import { animeConverter } from './AnimeConverter';
import { Anime } from '../../models/Anime';

/**
 * Returns a list of {@code Anime} objects
 * 
 * @param {Number[]} malIds - list of mal ids of animes objects to be retrieved
 */
export async function getAnimes(malIds: Number[]): Promise<Anime[]> {
  // get Anime object
  let animeList: Anime[] = [];
  for(let i=0;i<malIds.length;i++) {
    const animeSnap = await firebase.firestore()
      .collection('animes')
      .withConverter(animeConverter)
      .doc(malIds[i].toString()).get();

      const anime = animeSnap.data();
      if (anime) animeList.push(anime); 
  }
  return animeList;
}