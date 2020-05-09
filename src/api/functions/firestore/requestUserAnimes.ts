import firebase from '../../../firebase';
import { userConverter } from './UserConverter';
import { getAnimes } from './requestAnimes';
import { Anime } from '../../models/Anime';

/**
 * Returns a list of Mal Ids for a specific user from firestore
 * 
 * @param {String} uid - user id from the firebaseauth user object
 */
export async function getSavedAnimes(uid: string): Promise<Number[]> {
  // get AnimeUser object for a specific user
  const animeSnap = await firebase.firestore()
    .collection('users')
    .withConverter(userConverter)
    .doc(uid).get();

  // get the animes field data from the AnimeUser object
  const animeUser = animeSnap.data();
  if (animeUser == null) return [];
  return animeUser.animes;
}

/**
 * Returns a list of animes
 * @param {String} uid 
 */
export async function getSavedAndRecommendedAnimes(uid: string): Promise<Anime[]> {
  const savedAnimeIds = await getSavedAnimes(uid);
  if (savedAnimeIds.length === 0) return [];
  // get the anime objects using the mal ids in the users' anime list
  let animes: Anime[] = await getAnimes(savedAnimeIds);
  return animes;
}