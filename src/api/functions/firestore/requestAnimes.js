import firebase from '../../../firebase';
import { animeConverter } from './AnimeConverter';

/**
 * Returns a list of {@code Anime} objects
 * 
 * @param {String[]} malIds - list of mal ids of animes objects to be retrieved
 */
export async function getAnimes(malIds) {
  // get Anime object
  let animeList = [];
  for(let i=0;i<malIds.length;i++) {
    const animeSnap = await firebase.firestore()
      .collection('animes')
      .withConverter(animeConverter)
      .doc(malIds[i]).get();

      const anime = animeSnap.data();
      animeList.push(anime); 
  }
  return animeList;
}