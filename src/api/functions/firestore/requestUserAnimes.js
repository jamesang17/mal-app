import firebase from '../../../firebase';
import { userConverter } from './UserConverterrter';

/**
 * Returns a list of {@code Anime} objects for a specific user from firestore
 * 
 * @param {String} uid - user id from the firebaseauth user object
 */
export async function getSavedAnimes(uid) {
  // get AnimeUser object for a specific user
  const animeSnap = await firebase.firestore()
    .collection('users')
    .withConverter(userConverter)
    .doc(uid).get();

  // get the animeUser object
  const animeUser = animeSnap.data();
  return animeUser.animes
}