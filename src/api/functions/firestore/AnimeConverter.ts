import firebase from '../../../firebase';
import { Anime } from '../../models/Anime'; 

export const animeConverter = {
  toFirestore(anime: Anime): firebase.firestore.DocumentData {
    return { title: anime.title, imageUrl: anime.imageUrl, recommendations: anime.recommendations };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): Anime {
    const data = snapshot.data(options)!;
    return new Anime(snapshot.id, data.title, data.imageUrl, data.recommendations);
  }
}
