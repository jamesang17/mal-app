import firebase from '../../../firebase';

class AnimeUser {
  constructor(readonly animes: Number[]) {
    this.animes = animes;
  }
}

export const userConverter = {
  toFirestore(animeUser: AnimeUser): firebase.firestore.DocumentData {
    return { animes: animeUser.animes };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): AnimeUser {
    const data = snapshot.data(options)!;
    return new AnimeUser(data.animes);
  }
}
